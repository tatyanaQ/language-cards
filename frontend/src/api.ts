import { Question } from './types'

const buildQuery = (params: Record<string, unknown>) =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([name, value]) => `${name}=${value}`)
    .join('&')

const localFetch = async (url: string) => {
  try {
    const host = import.meta.env.VITE_HOST
    return await fetch(`${host}/api/${url}`)
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const fetchTags = async (): Promise<{ tags: string[] }> => {
  const resp = await localFetch('tags')
  return await resp.json()
}

export const fetchLesson = async (queryParams: {
  tag?: string
  limit?: number
}): Promise<{ questions: Question[] }> => {
  const query = buildQuery(queryParams)

  const resp = await localFetch(`lesson?${query}`)
  return await resp.json()
}
