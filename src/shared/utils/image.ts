/**
 * Utility for handling external images, especially to bypass CORS 
 * and manage broken URLs.
 */

/**
 * Wraps an image URL with a proxy service (wsrv.nl) to bypass CORS
 * and potentially optimize/resize if needed.
 */
export function getProxyUrl(url: string, options: { width?: number; height?: number; fit?: string } = {}): string {
  if (!url) return '';
  
  // If it's already a data URL or a relative path, return as is
  if (url.startsWith('data:') || url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
    return url;
  }

  const baseUrl = 'https://wsrv.nl/?url=';
  const encodedUrl = encodeURIComponent(url);
  let proxyUrl = `${baseUrl}${encodedUrl}`;

  if (options.width) proxyUrl += `&w=${options.width}`;
  if (options.height) proxyUrl += `&h=${options.height}`;
  if (options.fit) proxyUrl += `&fit=${options.fit}`;

  // Use noredirect to ensure we get an image or an error directly
  return proxyUrl;
}

/**
 * Basic check to see if a string looks like a common image URL
 */
export function isImageUrl(url: string): boolean {
  if (!url) return false;
  try {
    const path = new URL(url).pathname.toLowerCase();
    return /\.(jpg|jpeg|png|webp|gif|svg|avif)$/.test(path);
  } catch (e) {
    return false;
  }
}
