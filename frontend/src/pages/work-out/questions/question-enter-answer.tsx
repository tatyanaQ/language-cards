import React, { useState } from 'react'
import { Button, Row, Col, Input } from 'antd'
import { Question } from '../../../types'
import { useWindowSize } from '../../../hooks/useWindowSize'

const centeredChildrenStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const QuestionEnterAnswerCard: React.FC<{
  question: Question
  next: () => void
  isLast: boolean
}> = ({ question, next, isLast }) => {
  const [entered, setEntered] = useState<string>()
  const [ready, setReady] = useState(false)
  const { isSmall } = useWindowSize(900)

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

  const correactAnswerStyle: React.CSSProperties = {
    ...contentStyle,
    color: '#0f5132',
    border: '1px solid rgba(16,185,129,0.15)',
    backgroundColor: '#f6fffa',
  }

  const wrongAnswerStyle: React.CSSProperties = {
    ...contentStyle,
    color: '#7f1d1d',
    border: '1px solid rgba(248,113,113,0.12)',
    backgroundColor: '#fff5f5',
  }

  const controlContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isSmall ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  }

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    minHeight: isSmall ? 120 : 160,
    resize: 'vertical',
  }

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEntered(e.target.value)
  }

  const onCheck = () => {
    setReady(true)
  }

  const onNext = () => {
    next()
    setReady(false)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isSmall ? 'column' : 'row',
        gap: 16,
        alignItems: 'stretch',
        width: '100%',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={contentStyle}>{question.translation}</div>
      </div>

      <div style={{ flex: isSmall ? '1' : '0 0 360px' }}>
        <div style={{ marginTop: 8 }}>
          <Input.TextArea
            key={question._id}
            autoFocus
            onChange={onInputChange}
            style={textareaStyle}
            placeholder="Type your answer here..."
            aria-label="Your answer"
          />
        </div>

        <div style={{ marginTop: 12, ...controlContainerStyle }}>
          <Button onClick={onCheck}>Check</Button>
          <Button type="primary" disabled={!ready} onClick={onNext}>
            {isLast ? 'Done' : 'Next'}
          </Button>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        {ready ? (
          <div
            style={
              (entered || '').trim().toLowerCase() ===
              (question.item || '').trim().toLowerCase()
                ? correactAnswerStyle
                : wrongAnswerStyle
            }
            aria-live="polite"
          >
            {question.item}
          </div>
        ) : (
          <div style={contentStyle}>???</div>
        )}
      </div>
    </div>
  )
}
