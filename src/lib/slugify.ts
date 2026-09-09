export function slugify(text: string): string {
  return (
    text
      .toString()
      // Remove emoji and non-ASCII Unicode characters.
      .replace(/[^\u0000-\u007E]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove non-word characters.
      .replace(/--+/g, '-') // Collapse repeated hyphens.
      .replace(/^-+|-+$/g, '')
  ); // Trim - di awal/akhir
}
