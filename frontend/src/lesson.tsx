import React, { useState, useEffect } from 'react'
import { Steps } from 'antd'
import { QuestionCard } from './question-show-answer'
import { Question } from './types'

async function fetchData({ tag }: { tag?: string }) {
  const queryParams = { tag }
  const query = Object.entries(queryParams)
    .filter(([, value]) => value !== undefined)
    .map(([name, value]) => `${name}=${value}`)
    .join('&')

  const resp = await fetch(`api/lesson?${query}`)
  return await resp.json()
}

export const Lesson: React.FC<{ tag?: string }> = ({ tag }) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetchData({ tag }).then((response) => setQuestions(response.questions))
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
