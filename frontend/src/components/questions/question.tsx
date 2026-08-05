import React from 'react'
import { Question } from '../../types'
import { QuestionType } from '../../enums'
import { QuestionShowAnswerCard } from './question-show-answer'
import { QuestionEnterAnswerCard } from './question-enter-answer'
import { QuestionShowReverseCard } from './question-show-reverse'

export const QuestionCard: React.FC<{
  questionType: QuestionType
  question: Question
  next: () => void
  isLast: boolean
  onToggleReport: (questionId: string) => void
}> = ({ questionType, question, next, isLast, onToggleReport }) => {
  let questionComponent: React.ReactNode = null

  switch (questionType) {
    case QuestionType.ShowAnswer:
      questionComponent = (
        <QuestionShowAnswerCard
          key={question._id}
          question={question}
          next={next}
          isLast={isLast}
          onToggleReport={() => onToggleReport(question._id)}
        />
      )
      break
    case QuestionType.ShowReverse:
      questionComponent = (
        <QuestionShowReverseCard
          key={question._id}
          question={question}
          next={next}
          isLast={isLast}
          onToggleReport={() => onToggleReport(question._id)}
        />
      )
      break
    case QuestionType.EnterAnswer:
      questionComponent = (
        <QuestionEnterAnswerCard
          key={question._id}
          question={question}
          next={next}
          isLast={isLast}
          onToggleReport={() => onToggleReport(question._id)}
        />
      )
      break
    default:
      questionComponent = null
  }

  if (!questionComponent) return <></>

  return (
    <>
      {questionComponent}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <a
          href={`/cards/${question._id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open card ↗️
        </a>
      </div>
    </>
  )
}
