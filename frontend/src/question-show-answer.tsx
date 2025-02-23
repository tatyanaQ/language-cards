import React, { useState } from 'react'
import { Button } from 'antd'
import { Question } from './types'

export const QuestionCard: React.FC<{
  question: Question
  next: () => void
  isLast: boolean
}> = ({ question, next, isLast }) => {
  const [ready, setReady] = useState(false)

  const contentStyle: React.CSSProperties = {
    lineHeight: '200px',
    textAlign: 'center',
    color: 'blue',
    backgroundColor: 'white',
    borderRadius: '16px',
    border: '1px dashed blue',
    marginTop: 16,
  }

  const onCheck = () => {
    setReady(true)
  }

  const onNext = () => {
    next()
    setReady(false)
  }

  return (
    <>
      <div style={contentStyle}>{question.q}</div>
      <Button onClick={onCheck}>Check</Button>
      {ready && <div>{question.a}</div>}
      <div style={{ marginTop: 24 }}>
        <Button type="primary" disabled={!ready} onClick={onNext}>
          {isLast ? 'Done' : 'Next'}
        </Button>
      </div>
    </>
  )
}
