export function chunk<T>(list: T[], limit: number) {
  const chunks: T[][] = [];
  for (let i = 0; i < list.length; i += limit) {
    chunks.push(list.slice(i, i + limit));
  }
  return chunks;
}
