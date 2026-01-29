const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const TurndownService = require('turndown');
const { gfm } = require('turndown-plugin-gfm');
const { downloadImagesFromMarkdown } = require('./image-downloader');

// Configuration
const INPUT_CSV = process.argv[2] || 'input_urls.csv';
const DOWNLOAD_IMAGES = process.argv.includes('--download-images');
const OUTPUT_DIR = 'output';
const OUTPUT_CSV = path.join(OUTPUT_DIR, 'articles_markdown.csv');

// Initialize Turndown service for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-'
});
turndownService.use(gfm);

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Extract article content from a webpage
 */
async function scrapeArticle(url) {
  try {
    console.log(`Scraping: ${url}`);
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 30000
    });

    const $ = cheerio.load(response.data);
    
    // Remove unwanted elements
    $('script, style, nav, header, footer, .advertisement, .ads, .cookie-banner').remove();
    
    // Try to find the article content - common selectors
    let articleContent = null;
    const selectors = [
      'article',
      '[role="article"]',
      '.article-content',
      '.post-content',
      '.blog-post',
      '.entry-content',
      'main article',
      'main .content',
      '.markdown-body'
    ];
    
    for (const selector of selectors) {
      const element = $(selector);
      if (element.length > 0) {
        articleContent = element.first();
        break;
      }
    }
    
    // If no article found, try main tag or body
    if (!articleContent || articleContent.length === 0) {
      articleContent = $('main').first();
    }
    if (!articleContent || articleContent.length === 0) {
      articleContent = $('body');
    }
    
    // Extract title
    let title = $('h1').first().text().trim();
    if (!title) {
      title = $('title').text().trim();
    }
    
    // Extract and process images
    articleContent.find('img').each((i, img) => {
      const src = $(img).attr('src');
      if (src) {
        // Convert relative URLs to absolute
        const absoluteUrl = new URL(src, url).href;
        $(img).attr('src', absoluteUrl);
      }
    });
    
    // Convert links to absolute URLs
    articleContent.find('a').each((i, link) => {
      const href = $(link).attr('href');
      if (href && !href.startsWith('#')) {
        try {
          const absoluteUrl = new URL(href, url).href;
          $(link).attr('href', absoluteUrl);
        } catch (e) {
          // Keep original if URL parsing fails
        }
      }
    });
    
    // Get the HTML content
    const htmlContent = articleContent.html();
    
    // Convert to Markdown
    const markdown = turndownService.turndown(htmlContent);
    
    return {
      url,
      title,
      markdown,
      status: 'success'
    };
    
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return {
      url,
      title: '',
      markdown: '',
      status: `error: ${error.message}`
    };
  }
}

/**
 * Read URLs from CSV file
 */
async function readUrlsFromCsv(filePath) {
  return new Promise((resolve, reject) => {
    const urls = [];
    
    if (!fs.existsSync(filePath)) {
      reject(new Error(`Input file not found: ${filePath}`));
      return;
    }
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Try to find URL in common column names
        const url = row.url || row.URL || row.link || row.Link || row.href || Object.values(row)[0];
        if (url && url.trim()) {
          urls.push(url.trim());
        }
      })
      .on('end', () => {
        console.log(`Found ${urls.length} URLs to process`);
        resolve(urls);
      })
      .on('error', reject);
  });
}

/**
 * Save results to CSV
 */
async function saveResultsToCsv(results) {
  const csvWriter = createCsvWriter({
    path: OUTPUT_CSV,
    header: [
      { id: 'url', title: 'URL' },
      { id: 'title', title: 'Title' },
      { id: 'status', title: 'Status' },
      { id: 'markdown', title: 'Markdown Content' }
    ]
  });
  
  await csvWriter.writeRecords(results);
  console.log(`\nResults saved to: ${OUTPUT_CSV}`);
}

/**
 * Save individual markdown files
 */
async function saveMarkdownFiles(results) {
  const markdownDir = path.join(OUTPUT_DIR, 'markdown_files');
  if (!fs.existsSync(markdownDir)) {
    fs.mkdirSync(markdownDir, { recursive: true });
  }
  
  for (let index = 0; index < results.length; index++) {
    const result = results[index];
    if (result.status === 'success' && result.markdown) {
      // Create a safe filename from the title or URL
      let filename = result.title || `article_${index + 1}`;
      filename = filename
        .replace(/[^a-z0-9]/gi, '_')
        .replace(/_+/g, '_')
        .substring(0, 100)
        .toLowerCase();
      
      const filePath = path.join(markdownDir, `${filename}.md`);
      
      let content = result.markdown;
      
      // Download images if requested
      if (DOWNLOAD_IMAGES) {
        console.log(`Downloading images for: ${result.title}...`);
        try {
          content = await downloadImagesFromMarkdown(content, result.title, result.url);
        } catch (error) {
          console.error(`Error downloading images: ${error.message}`);
        }
      }
      
      // Create content with metadata
      const fullContent = `# ${result.title}\n\n**Source:** ${result.url}\n\n---\n\n${content}`;
      
      fs.writeFileSync(filePath, fullContent, 'utf8');
    }
  }
  
  console.log(`Individual markdown files saved to: ${markdownDir}`);
}

/**
 * Main function
 */
async function main() {
  console.log('=== Blog Article Markdown Converter ===\n');
  
  if (DOWNLOAD_IMAGES) {
    console.log('Image download mode: ENABLED\n');
  }
  
  try {
    // Check if input file exists
    if (!fs.existsSync(INPUT_CSV)) {
      console.log(`Input file not found: ${INPUT_CSV}`);
      console.log('\nCreating example input file...');
      
      // Create example CSV
      const exampleCsv = 'url\nhttps://example.com/blog/article1\nhttps://example.com/blog/article2\n';
      fs.writeFileSync(INPUT_CSV, exampleCsv);
      
      console.log(`\nExample file created: ${INPUT_CSV}`);
      console.log('Please update this file with your blog article URLs and run again.');
      console.log('\nUsage: node index.js [input_csv_file] [--download-images]');
      return;
    }
    
    // Read URLs from CSV
    const urls = await readUrlsFromCsv(INPUT_CSV);
    
    if (urls.length === 0) {
      console.log('No URLs found in the input file.');
      return;
    }
    
    // Process each URL
    const results = [];
    for (let i = 0; i < urls.length; i++) {
      console.log(`\nProcessing ${i + 1}/${urls.length}...`);
      const result = await scrapeArticle(urls[i]);
      results.push(result);
      
      // Add a small delay to be respectful to servers
      if (i < urls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Save results
    await saveResultsToCsv(results);
    await saveMarkdownFiles(results);
    
    // Print summary
    console.log('\n=== Summary ===');
    const successful = results.filter(r => r.status === 'success').length;
    const failed = results.length - successful;
    console.log(`Total URLs: ${results.length}`);
    console.log(`Successful: ${successful}`);
    console.log(`Failed: ${failed}`);
    
    console.log('\nDone! Check the output directory for results.');
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { scrapeArticle, readUrlsFromCsv };
