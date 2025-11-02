import React, { useState } from 'react'
import { Button } from 'antd'
import { Question } from '../../../types'
import { useWindowSize } from '../../../hooks/useWindowSize'

const centeredChildrenStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const QuestionShowAnswerCard: React.FC<{
  question: Question
  next: () => void
  isLast: boolean
}> = ({ question, next, isLast }) => {
  const [ready, setReady] = useState(false)
  const { isSmall } = useWindowSize(900)
  const isWide = !isSmall

  const contentStyle: React.CSSProperties = {
    minHeight: 120,
    padding: '20px',
    textAlign: 'center',
    color: 'blue',
    backgroundColor: 'white',
    borderRadius: 12,
    border: '1px dashed rgba(24,144,255,0.35)',
    marginTop: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  }

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isWide ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  }

  const onCheck = () => setReady(true)
  const onNext = () => {
    next()
    setReady(false)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isWide ? 'row' : 'column',
        gap: 16,
        alignItems: 'stretch',
        width: '100%',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={contentStyle}>{question.translation}</div>
      </div>

      <div
        style={{
          flex: isWide ? '0 0 120px' : 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={buttonContainerStyle}>
          <Button onClick={onCheck}>Check</Button>
          <Button type="primary" disabled={!ready} onClick={onNext}>
            {isLast ? 'Done' : 'Next'}
          </Button>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div style={contentStyle} aria-live="polite">
          {ready ? question.item : '???'}
        </div>
      </div>
    </div>
  )
}
