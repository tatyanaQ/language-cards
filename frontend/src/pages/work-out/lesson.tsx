import React, { useState } from 'react'
import { Steps } from 'antd'
import { QuestionCard } from './questions/question'
import { QuestionType } from '../../enums'
import { useLesson } from '../../hooks/useLesson'
import { useWindowSize } from '../../hooks/useWindowSize'

export const Lesson: React.FC<{
  tag?: string
  limit?: number
  questionType: QuestionType
}> = ({ tag, limit, questionType }) => {
  const { questions, loading, error } = useLesson({
    tag,
    limit,
  })
  const [current, setCurrent] = useState(0)

  const { isSmall } = useWindowSize(600)

  const isLast = (current: number) => current === questions.length - 1

  const next = () => {
    if (!isLast(current)) {
      setCurrent(current + 1)
    }
  }

  const items = questions.map((item, index) => ({
    key: index,
    title: '',
  }))

  if (loading) return <>Loading...</>
  if (error) return <>Failed to fetch questions: {error.message}</>

  return (
    <>
      {questions.length ? (
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
                <span style={{ opacity: 0.85 }}>{questions.length}</span>
              </div>
            </div>
          ) : (
            <Steps current={current} items={items} />
          )}
          <QuestionCard
            questionType={questionType}
            question={questions[current]}
            next={next}
            isLast={isLast(current)}
          />
        </>
      ) : (
        <>No questions</>
      )}
    </>
  )
}
