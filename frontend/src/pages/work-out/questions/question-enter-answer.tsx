import React, { useState } from 'react'
import { Button, Row, Col, Input } from 'antd'
import { Question } from '../../../types'

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

  const contentStyle: React.CSSProperties = {
    lineHeight: '200px',
    textAlign: 'center',
    color: 'blue',
    backgroundColor: 'white',
    borderRadius: '16px',
    border: '1px dashed blue',
    marginTop: 16,
  }

  const correactAnswerStyle: React.CSSProperties = {
    ...contentStyle,
    color: 'green',
  }

  const wrongAnswerStyle: React.CSSProperties = {
    ...contentStyle,
    color: 'red',
  }

  const onInputChange = (e) => {
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
    <>
      <Row style={centeredChildrenStyle}>
        <Col flex={15}>
          <div style={contentStyle}>{question.translation}</div>
        </Col>
      </Row>
      <Row style={centeredChildrenStyle}>
        <Col flex={7} style={centeredChildrenStyle}>
          <Input.TextArea rows={8} onChange={onInputChange} />
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
          {ready ? (
            <div
              style={
                entered === question.item
                  ? correactAnswerStyle
                  : wrongAnswerStyle
              }
            >
              {question.item}
            </div>
          ) : (
            <div style={contentStyle}>???</div>
          )}
        </Col>
      </Row>
    </>
  )
}
