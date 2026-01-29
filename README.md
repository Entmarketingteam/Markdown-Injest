# Markdown-Injest

A powerful automation tool to scrape blog articles from any website and convert them to markdown format for content ingestion and repurposing.

> **📌 This is a Command-Line Tool (CLI)** - Not a web server or hosted service. It runs locally on your computer.

## 📚 Documentation

- **🆕 New User?** → [HOW_TO_RUN.md](HOW_TO_RUN.md) - Complete beginner's guide
- **🎯 Quick Reference** → [QUICKSTART.md](QUICKSTART.md) - Fast setup
- **📖 Full Guide** → [USAGE_GUIDE.md](USAGE_GUIDE.md) - Visual walkthrough with examples
- **💡 Examples** → [EXAMPLES.md](EXAMPLES.md) - Real-world use cases

## 🚀 Getting Started in 3 Steps

### Prerequisites
- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- A terminal/command prompt
- Blog article URLs you want to convert

### Step 1: Install
```bash
# Clone the repository
git clone https://github.com/Entmarketingteam/Markdown-Injest.git
cd Markdown-Injest

# Install dependencies
npm install
```

### Step 2: Run
```bash
# Run the tool (it will help you get started)
npm start
```

### Step 3: Get Results
Your converted markdown files will be in the `output/` folder!

---

## 📖 Detailed Instructions

### How to Run This Tool

This is a **command-line tool** that runs on your local computer. Here's everything you need to know:

#### Option 1: Guided Setup (Easiest)
```bash
npm start
```
The tool will:
- Check if you have an input file
- Create an example file if you don't
- Guide you through what to do next

#### Option 2: With Your Own CSV File
```bash
# If you have a CSV file with URLs
node convert.js my_urls.csv

# To also download images locally
node convert.js my_urls.csv --download-images
```

#### What Happens When You Run It?
1. The tool reads your CSV file containing blog URLs
2. It visits each URL and extracts the article content
3. Converts the HTML to clean markdown format
4. Saves everything to the `output/` folder
5. Shows you a summary of what was processed

#### Example Run
```bash
$ npm start

╔════════════════════════════════════════════════════╗
║     Markdown Injest - Blog Article Converter      ║
╚════════════════════════════════════════════════════╝

📖 Processing URLs from: input_urls.csv

Found 3 URLs to process

Processing 1/3...
Scraping: https://example.com/blog/article1
✓ Successfully converted

Processing 2/3...
Scraping: https://example.com/blog/article2
✓ Successfully converted

Processing 3/3...
Scraping: https://example.com/blog/article3
✓ Successfully converted

Results saved to: output/articles_markdown.csv
Individual markdown files saved to: output/markdown_files

=== Summary ===
Total URLs: 3
Successful: 3
Failed: 0

Done! Check the output directory for results.
```

---

## Features

- 📝 Scrapes blog articles from any URL
- 🔄 Converts HTML content to clean markdown format
- 🖼️ Preserves images with absolute URLs
- 📊 Processes URLs from CSV files (compatible with Instant Data Scraper exports)
- 💾 Exports results to CSV and individual markdown files
- 🔗 Converts all relative links to absolute URLs
- ⚡ Handles multiple articles in batch

## Usage

### Quick Start

```bash
# Run with the helper script (recommended for first-time users)
npm start

# The script will guide you through setup if you don't have an input file
# Or specify your CSV file:
node convert.js my_urls.csv
```

### Step 1: Prepare Your URL List

Create a CSV file with your blog article URLs. You can:
- Export URLs using Instant Data Scraper Chrome extension
- Manually create a CSV with a column named `url`, `URL`, `link`, or similar

Example CSV format:
```csv
url
https://motionapp.com/resources/blog/article1
https://motionapp.com/resources/blog/article2
https://motionapp.com/resources/blog/article3
```

### Step 2: Run the Scraper

```bash
# Simple - using the helper script (recommended)
npm start

# Or with a custom file
node convert.js my_urls.csv

# Download images locally (optional)
node convert.js my_urls.csv --download-images

# Advanced - use the main script directly
node index.js my_urls.csv
node index.js my_urls.csv --download-images
```

**Image Download Options:**
- **Without `--download-images`**: Images remain as URLs pointing to their original sources (faster, smaller output)
- **With `--download-images`**: Images are downloaded locally and markdown updated to reference local files (self-contained, but larger)

### Step 3: Get Your Results

The tool creates an `output/` directory with:
- `articles_markdown.csv` - All articles in CSV format with markdown content
- `markdown_files/` - Individual .md files for each article
- `images/` - Downloaded images (when using --download-images flag)

## Output Format

### CSV Output
Contains columns:
- **URL**: Original article URL
- **Title**: Article title
- **Status**: Success or error message
- **Markdown Content**: Full article in markdown format

### Individual Markdown Files
Each article is saved as a separate `.md` file with:
- Article title as heading
- Source URL
- Full content in markdown format with images

## Example Workflow

1. Go to https://motionapp.com/resources/blog-interviews
2. Use Instant Data Scraper to extract all 81 blog article URLs
3. Export to CSV
4. Save the CSV as `input_urls.csv` in this directory
5. Run `npm start`
6. Find your markdown files in `output/markdown_files/`

## Features in Detail

### Smart Content Detection
Automatically detects article content using common selectors:
- `<article>` tags
- `.article-content`, `.post-content` classes
- `main` tag content
- And many more patterns

### Image Handling
- Converts relative image URLs to absolute URLs
- Preserves all image references in markdown format
- Images remain linked to their original sources

### Link Preservation
- Converts all relative links to absolute URLs
- Maintains all hyperlinks in the content
- Perfect for cross-referencing

### Error Handling
- Continues processing even if some URLs fail
- Provides detailed status for each article
- Logs errors for troubleshooting

## Requirements

- Node.js 14 or higher
- Internet connection to fetch articles

## Dependencies

- `axios` - HTTP client for fetching web pages
- `cheerio` - HTML parsing and manipulation
- `csv-parser` - CSV file reading
- `csv-writer` - CSV file writing
- `turndown` - HTML to Markdown conversion
- `turndown-plugin-gfm` - GitHub Flavored Markdown support

## Frequently Asked Questions

### How do I run this?
This is a command-line tool. After installing Node.js and running `npm install`, simply run:
```bash
npm start
```
See [HOW_TO_RUN.md](HOW_TO_RUN.md) for detailed step-by-step instructions.

### Do I need to host this somewhere?
**No!** This is not a web application. It runs locally on your computer. You don't need a server or hosting service.

### Is this a website or web server?
**No.** This is a command-line tool (CLI) that you run in your terminal/command prompt on your local machine.

### How do I use it after installation?
1. Open your terminal
2. Navigate to the Markdown-Injest folder: `cd Markdown-Injest`
3. Run: `npm start`
4. Follow the prompts or provide your CSV file

### Where do the results go?
All converted files are saved in the `output/` folder in the same directory where you ran the tool.

### Can I run it multiple times?
Yes! Just update your CSV file with new URLs and run `npm start` again. Previous results will remain in the output folder unless you delete them.

### Do I need to keep the terminal open?
Only while the tool is running. Once it finishes and shows "Done!", you can close the terminal and access your files in the output folder.

## Troubleshooting

### "Input file not found"
Make sure your CSV file exists in the project directory or specify the correct path.

### Articles not scraping correctly
Some websites may have anti-scraping measures. The tool uses a standard browser User-Agent but some sites may still block automated access.

### Missing content
If content is missing, the website may use JavaScript to load content. This tool works best with server-rendered HTML.

## License

MIT