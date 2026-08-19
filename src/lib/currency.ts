/** Format integer KSh cents as a display string, e.g. 240000 -> "KSh 2,400". */
export function formatKsh(cents: number): string {
  const shillings = Math.round(cents / 100);
  return `KSh ${shillings.toLocaleString("en-KE")}`;
}
