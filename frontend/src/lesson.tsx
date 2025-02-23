import React, { useState, useEffect } from 'react'
import { Steps } from 'antd'
import { QuestionCard } from './question-show-answer'
import { Question } from './types'

async function fetchData() {
  const resp = await fetch('api/lesson')
  return await resp.json()
}

export const Lesson: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetchData().then((response) => setQuestions(response.questions))
  }, [])

  const isLast = (current: number) => current === questions.length - 1

  const next = () => {
    if (!isLast(current)) {
      setCurrent(current + 1)
    }
  }

  const items = questions.map((item, index) => ({
    key: index,
    title: index + 1,
  }))

  return (
    <>
      {questions?.length ? (
        <>
          <Steps current={current} items={items} />
          <QuestionCard
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
