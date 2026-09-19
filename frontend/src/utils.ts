export const shuffleArray = <T>(array: T[]): T[] => {
  return array
    .map((item) => ({ item, weight: Math.random() }))
    .sort((a, b) => a.weight - b.weight)
    .map(({ item }) => item);
};

export const setJwt = (jwt: string) => {
  localStorage.setItem('jwt', jwt);
};

export const getJwt = (): string | null => {
  return localStorage.getItem('jwt');
};

export const removeJwt = () => {
  localStorage.removeItem('jwt');
};
