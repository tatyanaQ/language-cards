export const shuffleArray = <T>(array: T[]): T[] => {
  return array
    .map((item) => ({ item, weight: Math.random() }))
    .sort((a, b) => a.weight - b.weight)
    .map(({ item }) => item)
}
