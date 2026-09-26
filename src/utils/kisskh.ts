/**
 * Utility to generate authentic KissKH URLs for live streaming and official drama pages
 */
export function getKissKHDramaUrl(title: string, id: number | string, epId?: number | string): string {
  const cleanTitle = title
    .replace(/[^\w\s-]/g, '-')
    .trim()
    .replace(/\s+/g, '-');
  const base = `https://kisskh.do/Drama/${cleanTitle}?id=${id}`;
  if (epId) {
    return `${base}&ep=${epId}&page=0&pageSize=100`;
  }
  return base;
}
