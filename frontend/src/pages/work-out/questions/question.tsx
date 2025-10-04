import React from 'react'
import { Question } from '../../../types'
import { QuestionType } from '../../../enums'
import { QuestionShowAnswerCard } from './question-show-answer'
import { QuestionEnterAnswerCard } from './question-enter-answer'

export const QuestionCard: React.FC<{
  questionType: QuestionType
  question: Question
  next: () => void
  isLast: boolean
}> = ({ questionType, question, next, isLast }) => {
  switch (questionType) {
    case QuestionType.ShowAnswer:
      return (
        <QuestionShowAnswerCard
          key={question._id}
          question={question}
          next={next}
          isLast={isLast}
        />
      )
    case QuestionType.EnterAnswer:
      return (
        <QuestionEnterAnswerCard
          key={question._id}
          question={question}
          next={next}
          isLast={isLast}
        />
      )
    default:
      return <></>
  }
}
