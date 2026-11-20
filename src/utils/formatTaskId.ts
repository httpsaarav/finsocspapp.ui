/**
 * Helper to format task ID to exactly 4 characters as requested
 * Examples:
 * "T-f2a872b45b90..." -> "#F2A8"
 * "T-8941a37c9201..." -> "#8941"
 * "T-1144..." -> "#1144"
 */
export function formatTaskId(id: string): string {
  if (!id) return "#0000";
  // Remove "T-" or any prefix, pick the first 4 characters and uppercase for clear readability
  const clean = id.replace(/^T-|^#/, '').trim();
  const shortId = clean.slice(0, 4).toUpperCase();
  return `#${shortId}`;
}

