export function entries() {
  return Array.from({ length: 100 }, (_, index) => ({
    movieId: String(index + 1),
  }));
}
