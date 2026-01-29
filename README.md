# Markdown-Injest

A powerful automation tool to scrape blog articles from any website and convert them to markdown format for content ingestion and repurposing.

## Features

- 📝 Scrapes blog articles from any URL
- 🔄 Converts HTML content to clean markdown format
- 🖼️ Preserves images with absolute URLs
- 📊 Processes URLs from CSV files (compatible with Instant Data Scraper exports)
- 💾 Exports results to CSV and individual markdown files
- 🔗 Converts all relative links to absolute URLs
- ⚡ Handles multiple articles in batch

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

## Usage

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
# Using default input file (input_urls.csv)
npm start

# Or specify a custom input file
node index.js my_urls.csv
```

### Step 3: Get Your Results

The tool creates an `output/` directory with:
- `articles_markdown.csv` - All articles in CSV format with markdown content
- `markdown_files/` - Individual .md files for each article

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

## Troubleshooting

### "Input file not found"
Make sure your CSV file exists in the project directory or specify the correct path.

### Articles not scraping correctly
Some websites may have anti-scraping measures. The tool uses a standard browser User-Agent but some sites may still block automated access.

### Missing content
If content is missing, the website may use JavaScript to load content. This tool works best with server-rendered HTML.

## License

MIT