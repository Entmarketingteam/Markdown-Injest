#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('');
console.log('╔════════════════════════════════════════════════════╗');
console.log('║     Markdown Injest - Blog Article Converter      ║');
console.log('╚════════════════════════════════════════════════════╝');
console.log('');

// Check if dependencies are installed
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...\n');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('\n✅ Dependencies installed!\n');
  } catch (error) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
  }
}

// Check for input file
const inputFile = process.argv[2] || 'input_urls.csv';
const downloadImages = process.argv.includes('--download-images');

if (!fs.existsSync(inputFile)) {
  console.log('📋 No input file found. Let me help you get started!\n');
  console.log('You have two options:\n');
  console.log('1️⃣  Create a CSV file with your blog URLs');
  console.log('   - Column should be named: url, URL, link, or Link');
  console.log('   - Example:');
  console.log('     url');
  console.log('     https://motionapp.com/blog/article1');
  console.log('     https://motionapp.com/blog/article2');
  console.log('');
  console.log('2️⃣  Use Instant Data Scraper Chrome Extension');
  console.log('   - Visit a blog listing page');
  console.log('   - Extract all article links');
  console.log('   - Export as CSV');
  console.log('');
  
  // Create example file
  const exampleContent = 'url\nhttps://example.com/blog/article1\nhttps://example.com/blog/article2\nhttps://example.com/blog/article3\n';
  fs.writeFileSync(inputFile, exampleContent);
  
  console.log(`✅ Created example file: ${inputFile}`);
  console.log('');
  console.log('📝 Please edit this file with your actual blog URLs, then run:');
  console.log(`   node convert.js ${inputFile}`);
  console.log('');
  console.log('For image download:');
  console.log(`   node convert.js ${inputFile} --download-images`);
  console.log('');
  process.exit(0);
}

// Run the converter
console.log(`📖 Processing URLs from: ${inputFile}`);
if (downloadImages) {
  console.log('🖼️  Image download: ENABLED');
}
console.log('');

try {
  const command = downloadImages 
    ? `node index.js "${inputFile}" --download-images`
    : `node index.js "${inputFile}"`;
  
  execSync(command, { stdio: 'inherit' });
  
  console.log('');
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║                  ✅ SUCCESS!                       ║');
  console.log('╚════════════════════════════════════════════════════╝');
  console.log('');
  console.log('📂 Your converted articles are ready!');
  console.log('');
  console.log('   📄 CSV file: output/articles_markdown.csv');
  console.log('   📁 Markdown files: output/markdown_files/');
  if (downloadImages) {
    console.log('   🖼️  Images: output/images/');
  }
  console.log('');
  console.log('💡 Next steps:');
  console.log('   - Review the markdown files');
  console.log('   - Edit for your company\'s voice');
  console.log('   - Import into your CMS');
  console.log('');
  
} catch (error) {
  console.error('');
  console.error('❌ An error occurred during conversion');
  console.error('   Check the output above for details');
  console.error('');
  process.exit(1);
}
