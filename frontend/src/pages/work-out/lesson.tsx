import React, { useState, useEffect } from 'react'
import { Steps } from 'antd'
import { QuestionCard } from '../../question'
import { Question } from '../../types'
import { fetchLesson } from '../../api'
import { shuffleArray } from '../../utils'
import { QuestionType } from '../../enums'

export const Lesson: React.FC<{
  tag?: string
  limit?: number
  questionType: QuestionType
}> = ({ tag, limit, questionType }) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetchLesson({ tag }).then((response) =>
      setQuestions(shuffleArray(response.questions).slice(0, limit))
    )
  }, [])

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

  return (
    <>
      {questions?.length ? (
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
