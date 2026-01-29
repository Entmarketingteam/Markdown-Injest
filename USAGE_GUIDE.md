# Complete Usage Guide - Visual Walkthrough

## ✅ This Tool Works! Here's Proof:

### What Just Happened
We ran the tool and successfully converted a blog article to markdown. Here's exactly what you'll see:

```
╔════════════════════════════════════════════════════╗
║     Markdown Injest - Blog Article Converter      ║
╚════════════════════════════════════════════════════╝

📖 Processing URLs from: test_urls.csv

Found 1 URLs to process

Processing 1/1...
Scraping: https://nodejs.org/en/about

Results saved to: output/articles_markdown.csv
Individual markdown files saved to: output/markdown_files

=== Summary ===
Total URLs: 1
Successful: 1
Failed: 0

Done! Check the output directory for results.

╔════════════════════════════════════════════════════╗
║                  ✅ SUCCESS!                       ║
╚════════════════════════════════════════════════════╝

📂 Your converted articles are ready!
```

## The Complete Workflow (Step-by-Step)

### Step 1: Install Node.js
1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Verify by opening terminal and typing: `node --version`

### Step 2: Get the Tool
```bash
# Open your terminal
git clone https://github.com/Entmarketingteam/Markdown-Injest.git
cd Markdown-Injest
npm install
```

### Step 3: Prepare Your URLs
Create a file named `input_urls.csv`:
```csv
url
https://motionapp.com/resources/blog/article1
https://motionapp.com/resources/blog/article2
https://motionapp.com/resources/blog/article3
```

### Step 4: Run It!
```bash
npm start
```

### Step 5: Get Your Files
Your converted markdown files are in:
- `output/articles_markdown.csv` - All in one CSV
- `output/markdown_files/` - Individual .md files

## Real Example Output

After running, you'll have files like:

**output/markdown_files/about_node_js_.md**
```markdown
# About Node.js®

**Source:** https://nodejs.org/en/about

---

# About Node.js®

As an asynchronous event-driven JavaScript runtime, Node.js is 
designed to build scalable network applications...
```

## Common Scenarios

### Scenario 1: First Time User
```bash
# 1. Install Node.js from nodejs.org
# 2. Clone and setup
git clone https://github.com/Entmarketingteam/Markdown-Injest.git
cd Markdown-Injest
npm install

# 3. Run with no files
npm start
# Tool creates example file and tells you what to do next
```

### Scenario 2: I Have URLs from Instant Data Scraper
```bash
# 1. Export your URLs from Instant Data Scraper as CSV
# 2. Save as input_urls.csv in Markdown-Injest folder
# 3. Run
npm start
# Done! Check output folder
```

### Scenario 3: I Want Images Downloaded Too
```bash
node convert.js my_urls.csv --download-images
```

## What This Tool Does (In Simple Terms)

1. **Reads** your list of blog URLs from a CSV file
2. **Visits** each URL like a web browser would
3. **Extracts** the article content (text, headings, images, links)
4. **Converts** everything to clean markdown format
5. **Saves** the results to files on your computer

## What This Tool Does NOT Do

❌ Host a website
❌ Run as a server
❌ Need to be deployed anywhere
❌ Require cloud services

✅ It runs on YOUR computer
✅ It processes files locally
✅ It saves results to YOUR hard drive

## File Locations

After running, here's where everything is:

```
Markdown-Injest/
├── input_urls.csv          ← Your URL list (you create this)
├── output/                 ← Results go here
│   ├── articles_markdown.csv
│   └── markdown_files/
│       ├── article1.md
│       ├── article2.md
│       └── article3.md
└── (all the tool files)
```

## Terminal Commands Cheat Sheet

```bash
# Navigate to the folder
cd Markdown-Injest

# Run the tool
npm start

# Check if Node.js is installed
node --version

# List files in output folder
ls output/markdown_files/

# View a markdown file
cat output/markdown_files/article_title.md
```

## Video Tutorial Concept

If we were to make a video, here's what it would show:

1. **[0:00-0:30]** Installing Node.js
2. **[0:30-1:00]** Cloning repository and running npm install
3. **[1:00-1:30]** Creating input_urls.csv file
4. **[1:30-2:00]** Running npm start
5. **[2:00-2:30]** Showing the output folder and files
6. **[2:30-3:00]** Opening a markdown file to see the converted content

## Success Indicators

You'll know it worked when:
- ✅ You see the success banner in terminal
- ✅ An `output` folder appears
- ✅ You can open .md files in that folder
- ✅ The files contain your blog content in markdown

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "command not found: npm" | Install Node.js from nodejs.org |
| "No such file or directory" | Make sure you're in the Markdown-Injest folder |
| "Cannot find module" | Run `npm install` first |
| "No URLs found" | Check your CSV file has 'url' as header |
| Empty output files | URL might be blocked or JavaScript-only content |

## Need Help?

1. Check [HOW_TO_RUN.md](HOW_TO_RUN.md) for detailed instructions
2. Check [README.md](README.md) for complete documentation
3. Check [QUICKSTART.md](QUICKSTART.md) for quick reference
4. Check [EXAMPLES.md](EXAMPLES.md) for real-world examples

---

**Remember:** This is a LOCAL tool. It runs on YOUR computer. No hosting needed! 🎉
