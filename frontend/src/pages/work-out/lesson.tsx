import React, { useState } from 'react'
import { Steps } from 'antd'
import { QuestionCard } from './questions/question'
import { QuestionType } from '../../enums'
import { useLesson } from '../../hooks/useLesson'

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
          <Steps current={current} items={items} />
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
