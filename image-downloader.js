const fs = require('fs');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

/**
 * Download images from markdown content and update references
 */
async function downloadImagesFromMarkdown(markdownContent, articleTitle, baseUrl) {
  const imagesDir = path.join('output', 'images', sanitizeFilename(articleTitle));
  
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  // Find all image URLs in markdown
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  const downloads = [];
  
  while ((match = imageRegex.exec(markdownContent)) !== null) {
    const altText = match[1];
    const imageUrl = match[2];
    
    downloads.push({
      altText,
      originalUrl: imageUrl,
      match: match[0]
    });
  }
  
  let updatedContent = markdownContent;
  
  for (const download of downloads) {
    try {
      const localPath = await downloadImage(download.originalUrl, imagesDir);
      const relativePath = path.relative('output/markdown_files', localPath);
      
      // Update markdown to reference local image
      const newImageRef = `![${download.altText}](${relativePath})`;
      updatedContent = updatedContent.replace(download.match, newImageRef);
      
      console.log(`  Downloaded: ${path.basename(localPath)}`);
    } catch (error) {
      console.error(`  Failed to download image: ${download.originalUrl}`, error.message);
    }
  }
  
  return updatedContent;
}

/**
 * Download a single image
 */
async function downloadImage(url, targetDir) {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    timeout: 30000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  
  // Get file extension from content-type or URL
  const contentType = response.headers['content-type'];
  let ext = '.jpg';
  if (contentType) {
    if (contentType.includes('png')) ext = '.png';
    else if (contentType.includes('gif')) ext = '.gif';
    else if (contentType.includes('webp')) ext = '.webp';
    else if (contentType.includes('svg')) ext = '.svg';
  } else {
    const urlExt = path.extname(new URL(url).pathname);
    if (urlExt) ext = urlExt;
  }
  
  // Create filename from URL hash to avoid duplicates
  const hash = crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
  const filename = `image_${hash}${ext}`;
  const filePath = path.join(targetDir, filename);
  
  fs.writeFileSync(filePath, response.data);
  
  return filePath;
}

/**
 * Sanitize filename
 */
function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .substring(0, 100)
    .toLowerCase();
}

module.exports = {
  downloadImagesFromMarkdown,
  downloadImage
};
