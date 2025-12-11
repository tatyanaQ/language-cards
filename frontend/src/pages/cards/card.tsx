import React from 'react'
import { useParams } from 'react-router-dom'
import { Spin, Card as AntdCard, Button } from 'antd'
import { useQuestions } from '../../hooks/useQuestions'
import CardTitle from './card-title'

const Card: React.FC = () => {
  const { id } = useParams()
  const {
    questions: [question],
    loading,
  } = useQuestions({
    id: id || undefined,
  })

  if (!id) {
    return <p>No card ID provided.</p>
  }

  if (loading) {
    return <Spin />
  }

  if (!question) {
    return <p>Card not found.</p>
  }

  return (
    <AntdCard
      title={<CardTitle question={question} />}
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <p>
        <strong>Translation:</strong> {question.translation}
      </p>
      <p>
        <strong>Tags:</strong>{' '}
        {question.tags && question.tags.length
          ? question.tags.join(', ')
          : null}
      </p>
    </AntdCard>
  )
}

export default Card
