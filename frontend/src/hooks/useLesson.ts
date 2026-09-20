import { useEffect, useState } from 'react';
import { fetchLesson } from '../api';
import { Question } from '../types';

export function useLesson(params: {
  tags?: string[];
  limit?: number;
  onlyUnreplied?: boolean;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchLesson(params || {})
      .then(({ questions }) => {
        setQuestions(questions);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [params?.tags, params?.limit, params.onlyUnreplied]);

  return { questions, loading, error };
}
