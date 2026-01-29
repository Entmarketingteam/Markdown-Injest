# How to Run Markdown-Injest

## What is this?
This is a **command-line tool** (not a website) that runs on your computer to convert blog articles into markdown files.

## Prerequisites

Before you start, make sure you have:
- ✅ **Node.js installed** (version 14 or higher)
  - Don't have it? Download from https://nodejs.org/
  - To check: Open terminal and type `node --version`
- ✅ **A terminal/command prompt** open
- ✅ **Blog URLs** you want to convert

## Installation (Do This Once)

1. **Open your terminal** (Command Prompt on Windows, Terminal on Mac/Linux)

2. **Navigate to where you want to install the tool:**
   ```bash
   cd Desktop
   # or wherever you want to put it
   ```

3. **Clone this repository:**
   ```bash
   git clone https://github.com/Entmarketingteam/Markdown-Injest.git
   ```

4. **Go into the folder:**
   ```bash
   cd Markdown-Injest
   ```

5. **Install dependencies:**
   ```bash
   npm install
   ```
   This will take a minute or two.

## How to Use It

### Quick Method (Recommended for First-Time Users)

1. **Make sure you're in the Markdown-Injest folder:**
   ```bash
   cd Markdown-Injest
   # If you're not already there
   ```

2. **Run the tool:**
   ```bash
   npm start
   ```

3. **Follow the prompts!** The tool will:
   - Check if you have a URL list
   - Create an example file if you don't
   - Tell you what to do next

### With Your Own URLs

#### Step A: Prepare Your URL List

Create a file called `input_urls.csv` in the Markdown-Injest folder with this format:

```csv
url
https://example.com/blog/article1
https://example.com/blog/article2
https://example.com/blog/article3
```

**Tips:**
- First line must be `url` (the header)
- Each line after is one blog article URL
- You can use Instant Data Scraper Chrome extension to get URLs automatically

#### Step B: Run the Conversion

```bash
npm start
```

That's it! The tool will:
1. Read your URLs
2. Visit each page
3. Extract the content
4. Convert to markdown
5. Save in the `output` folder

### Advanced: Download Images Too

If you want images saved locally (not just linked):

```bash
node convert.js input_urls.csv --download-images
```

## Where Are My Results?

After running, check the `output/` folder:

```
output/
├── articles_markdown.csv        # All articles in one CSV file
└── markdown_files/              # Individual markdown files
    ├── article_title_1.md
    ├── article_title_2.md
    └── article_title_3.md
```

## Common Questions

### Q: Do I need to host this somewhere?
**A:** No! This runs on your local computer. It's not a website.

### Q: How do I run it again?
**A:** Just navigate to the folder and run `npm start` again.

### Q: Can I use it for multiple batches?
**A:** Yes! Just update your `input_urls.csv` file and run again.

### Q: Where does it save files?
**A:** In the `output/` folder inside the Markdown-Injest directory.

### Q: What if I close the terminal?
**A:** Just open it again, navigate back to the folder (`cd Markdown-Injest`), and run `npm start`.

## Troubleshooting

### "command not found: npm"
- You need to install Node.js first
- Download from https://nodejs.org/
- Restart your terminal after installing

### "Cannot find module"
- Run `npm install` in the Markdown-Injest folder
- Make sure you're in the correct directory

### "No URLs found"
- Check that your CSV file is named `input_urls.csv`
- Make sure the first line is `url`
- Check URLs start with `http://` or `https://`

### "Permission denied"
- On Mac/Linux, try: `sudo npm install`
- Make sure you have write permissions in the folder

## Video Tutorial

Want to see it in action? Here's what it looks like:

1. Open terminal
2. Navigate to folder: `cd Markdown-Injest`
3. Run command: `npm start`
4. Check output folder for your markdown files!

## Need More Help?

- Check `README.md` for detailed documentation
- Check `QUICKSTART.md` for a quick reference
- Check `EXAMPLES.md` for real-world usage examples

---

**Remember:** This is a tool that runs on YOUR computer. You don't "host" it anywhere - you just run it when you need to convert blog articles to markdown!
