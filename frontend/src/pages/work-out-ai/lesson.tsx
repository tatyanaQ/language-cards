import React, { useState } from 'react'
import { Steps } from 'antd'
import { QuestionCard } from '../../components/questions/question'
import { QuestionType } from '../../enums'
import { useWindowSize } from '../../hooks/useWindowSize'
import { useAiLesson } from '../../hooks/useAiLesson'

export const Lesson: React.FC<{
  tag?: string
  limit?: number
}> = ({ tag, limit }) => {
  const { sentences, loading, error } = useAiLesson({
    tag,
    limit,
  })
  const [current, setCurrent] = useState(0)

  const { isSmall } = useWindowSize(600)

  const isLast = (current: number) => current === sentences.length - 1

  const next = () => {
    if (!isLast(current)) {
      setCurrent(current + 1)
    }
  }

  const items = sentences.map((_, index) => ({
    key: index,
    title: '',
  }))

  if (loading) return <>Loading...</>
  if (error) return <>Failed to fetch work out: {error.message}</>

  return (
    <>
      {sentences.length ? (
        <>
          {isSmall || items.length > 30 ? (
            <div style={{ padding: '8px 0', textAlign: 'center' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#f5f7fa',
                  border: '1px solid #e6eef6',
                  padding: '6px 12px',
                  borderRadius: 20,
                  boxShadow: '0 1px 2px rgba(16, 24, 40, 0.04)',
                  fontSize: 14,
                  color: '#111827',
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    background: '#ffffff',
                    padding: '4px 8px',
                    borderRadius: 12,
                    fontWeight: 700,
                    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.03)',
                  }}
                >
                  {current + 1}
                </span>
                <span style={{ opacity: 0.6 }}>/</span>
                <span style={{ opacity: 0.85 }}>{sentences.length}</span>
              </div>
            </div>
          ) : (
            <Steps current={current} items={items} />
          )}
          <QuestionCard
            questionType={QuestionType.ShowAnswer}
            question={{
              _id: sentences[current].cardIds[0],
              item: sentences[current].itemLanguage,
              translation: sentences[current].translationLanguage,
              language: '',
              tags: [],
            }}
            next={next}
            isLast={isLast(current)}
          />
        </>
      ) : (
        <>No sentences</>
      )}
    </>
  )
}
