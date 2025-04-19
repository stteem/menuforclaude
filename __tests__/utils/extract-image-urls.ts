import fs from 'fs';
import path from 'path';

/**
 * Extracts all Unsplash image URLs from a React component file
 * @param filePath Path to the React component file
 * @returns Array of Unsplash image URLs
 */
export function extractImageUrls(filePath: string): string[] {
  // Read the file
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Regular expression to match Unsplash URLs
  // This matches URLs starting with https://images.unsplash.com/
  const unsplashUrlRegex = /https:\/\/images\.unsplash\.com\/[a-zA-Z0-9-_./?=&%]+/g;
  
  // Find all matches and return unique URLs
  const matches = content.match(unsplashUrlRegex) || [];
  
  // Return unique URLs
  return [...new Set(matches)];
}

/**
 * Usage example:
 * 
 * const homePageImageUrls = extractImageUrls(path.join(process.cwd(), 'app/home/page.tsx'));
 * console.log(homePageImageUrls);
 */