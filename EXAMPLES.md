# Usage Examples

## Example 1: Scraping Motion App Blog Interviews

1. Visit https://motionapp.com/resources/blog-interviews
2. Use Instant Data Scraper Chrome extension to extract all article links
3. Export the data as CSV
4. Save the CSV as `input_urls.csv`
5. Run: `npm start`

Your CSV should look like:
```csv
url
https://motionapp.com/resources/blog/article1
https://motionapp.com/resources/blog/article2
...
```

## Example 2: Custom CSV File

```bash
node index.js my_custom_urls.csv
```

## Example 3: Instant Data Scraper Export

If your Instant Data Scraper export has different column names, the tool will automatically detect:
- `url`, `URL`
- `link`, `Link`  
- `href`
- Or the first column value

Example exports that work:
```csv
Link,Title,Date
https://blog.com/post1,Post 1,2024-01-01
https://blog.com/post2,Post 2,2024-01-02
```

```csv
URL
https://site.com/article1
https://site.com/article2
```

## Output Structure

After running, you'll get:

```
output/
├── articles_markdown.csv        # All articles in one CSV
└── markdown_files/              # Individual markdown files
    ├── article_title_1.md
    ├── article_title_2.md
    └── article_title_3.md
```

## Tips

1. **Batch Processing**: The tool adds 1 second delay between requests to be respectful to servers
2. **Error Handling**: If some URLs fail, the tool continues processing others
3. **Content Ingestion**: Use the individual .md files for easy copy/paste into your CMS
4. **Image Links**: All images link to their original sources - download them separately if needed
