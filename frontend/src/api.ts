import { AiQuestion, Question, User } from './types';
import { removeJwt, getJwt, setJwt } from './utils';

const resolveHostUrl = (path: string) => {
  const host = import.meta.env.VITE_HOST;
  // no need for host when deployed
  return `${host || ''}/api/${path}`;
};

const buildQuery = (params: Record<string, unknown>) =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([name, value]) => {
      if (Array.isArray(value)) {
        return value
          .map((item, index) => `${name}[${index}]=${item}`)
          .join('&');
      }

      return `${name}=${value}`;
    })
    .join('&');

const localFetch = async (url: string, body?: unknown) => {
  try {
    const hostUrl = resolveHostUrl(url);
    const token = getJwt();
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (body) headers['Content-Type'] = 'application/json';

    const resp = await fetch(hostUrl, {
      headers,
      ...(body ? { method: 'POST', body: JSON.stringify(body) } : {}),
    });
    if (resp.status === 401) {
      removeJwt();
    }
    return resp;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const login = async (
  username: string,
  password: string
): Promise<{ token: string; user: User }> => {
  const hostUrl = resolveHostUrl('auth/login');

  const resp = await fetch(hostUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!resp.ok) {
    const errorMessage = (await resp.json())?.error || resp.statusText;
    throw new Error(errorMessage);
  }

  const data = await resp.json();
  setJwt(data.token);
  return data;
};

export const checkAuth = async (): Promise<User | null> => {
  const token = getJwt();
  if (!token) return null;

  const hostUrl = resolveHostUrl('auth/check');
  const resp = await fetch(hostUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) {
    removeJwt();
    return null;
  }

  const data = await resp.json();
  return data.user;
};

export const fetchTags = async (): Promise<{ tags: string[] }> => {
  const resp = await localFetch('tags');
  return await resp.json();
};

export const fetchQuestions = async (queryParams: {
  id?: string;
  item?: string;
  translation?: string;
  tag?: string;
  page?: number;
  limit?: number;
}): Promise<{ questions: Question[]; count: number }> => {
  const query = buildQuery(queryParams);

  const resp = await localFetch(`questions?${query}`);
  return await resp.json();
};

export const fetchLesson = async (queryParams: {
  tags?: string[];
  limit?: number;
  onlyUnreplied?: boolean;
}): Promise<{ questions: Question[] }> => {
  const query = buildQuery(queryParams);

  const resp = await localFetch(`lesson?${query}`);
  return await resp.json();
};

export const fetchAiLesson = async (queryParams: {
  tags?: string[];
  limit?: number;
}): Promise<{
  questions: Question[];
  aiLesson: AiQuestion[];
}> => {
  const query = buildQuery(queryParams);

  const resp = await localFetch(`lesson-ai?${query}`);
  return await resp.json();
};

export const recordReply = async (questionId: string) => {
  const resp = await localFetch('reply', { questionId });
  await resp.json();
};
