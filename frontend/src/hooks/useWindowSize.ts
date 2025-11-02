export function useWindowSize(breakpoint = 900) {
  const isClient = typeof window !== 'undefined'
  const width = isClient ? window.innerWidth : 1024
  const height = isClient ? window.innerHeight : 768

  return {
    width,
    height,
    isSmall: width < breakpoint,
  }
}
