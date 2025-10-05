import React, { useState } from 'react'
import { Button, Row, Col } from 'antd'
import { Question } from '../../../types'

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
    <Row style={centeredChildrenStyle}>
      <Col flex={7}>
        <div style={contentStyle}>{question.translation}</div>
      </Col>
      <Col flex={1} style={centeredChildrenStyle}>
        <Row>
          <Col>
            <Row>
              <Button onClick={onCheck}>Check</Button>
            </Row>
            <Row style={{ marginBottom: '48px' }} />
            <Row>
              <Button type="primary" disabled={!ready} onClick={onNext}>
                {isLast ? 'Done' : 'Next'}
              </Button>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col flex={7}>
        <div style={contentStyle}>{ready ? question.item : '???'}</div>
      </Col>
    </Row>
  )
}
