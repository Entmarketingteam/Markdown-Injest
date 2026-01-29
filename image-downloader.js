const fs = require('fs');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

// Configuration
const IMAGE_DOWNLOAD_TIMEOUT_MS = 30000;
const MAX_IMAGE_SIZE_MB = 10;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

/**
 * Validate URL to prevent SSRF attacks
 */
function isValidImageUrl(urlString) {
  try {
    const url = new URL(urlString);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(url.protocol)) {
      return false;
    }
    
    // Block localhost and private IP ranges
    const hostname = url.hostname.toLowerCase();
    
    if (['localhost', '127.0.0.1', '0.0.0.0', '::1'].includes(hostname)) {
      return false;
    }
    
    if (hostname.startsWith('10.') || 
        hostname.startsWith('192.168.') ||
        hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)) {
      return false;
    }
    
    if (hostname.startsWith('169.254.')) {
      return false;
    }
    
    return true;
  } catch (e) {
    return false;
  }
}

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
      console.error(`  Failed to download ${download.originalUrl}: ${error.message}`);
    }
  }
  
  return updatedContent;
}

/**
 * Download a single image
 */
async function downloadImage(url, targetDir) {
  // Validate URL
  if (!isValidImageUrl(url)) {
    throw new Error('Invalid or unsafe URL');
  }
  
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    timeout: IMAGE_DOWNLOAD_TIMEOUT_MS,
    maxContentLength: MAX_IMAGE_SIZE_BYTES,
    maxRedirects: 5,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
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
