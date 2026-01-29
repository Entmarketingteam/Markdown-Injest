# Quick Start Guide

## Installation

```bash
# Clone the repository
git clone https://github.com/Entmarketingteam/Markdown-Injest.git
cd Markdown-Injest

# Install dependencies
npm install
```

## Basic Usage

### 1. Prepare Your URLs

Create a file named `input_urls.csv` with your blog article URLs:

```csv
url
https://motionapp.com/resources/blog/article1
https://motionapp.com/resources/blog/article2
```

Or use Instant Data Scraper to export URLs from any blog listing page.

### 2. Run the Tool

```bash
npm start
```

### 3. Get Your Results

Find your converted articles in:
- `output/articles_markdown.csv` - All articles in one CSV
- `output/markdown_files/` - Individual markdown files

## Advanced Options

### Download Images Locally

```bash
node index.js input_urls.csv --download-images
```

This will:
- Download all images from articles
- Save them in `output/images/`
- Update markdown to reference local files

### Custom Input File

```bash
node index.js my_custom_file.csv
```

## Use Case: Motion App Blog

1. Go to https://motionapp.com/resources/blog-interviews
2. Use Instant Data Scraper to extract all 81 article URLs
3. Export to CSV
4. Save as `input_urls.csv`
5. Run `npm start`
6. Get 81 markdown files ready for your blog!

## Tips

- The tool respects servers with 1-second delays between requests
- Failed URLs won't stop the process - check the CSV for status
- Images are included as URLs by default (no local storage needed)
- Use `--download-images` only if you need fully self-contained files

## Troubleshooting

**No URLs found?**
- Check your CSV has a column named `url`, `URL`, `link`, or `Link`
- Make sure URLs are valid (start with http:// or https://)

**Articles not scraping?**
- Some sites may block automated access
- The tool uses standard browser headers but some sites have protection

**Missing content?**
- JavaScript-heavy sites may not work (this tool needs server-rendered HTML)
- Try the URL in a browser with JavaScript disabled to test

## Next Steps

After converting:
1. Review the markdown files in `output/markdown_files/`
2. Edit as needed for your company's voice
3. Import into your CMS or blog platform
4. Enjoy your new content!
