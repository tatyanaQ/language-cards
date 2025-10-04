import React, { useState } from 'react'
import { Lesson } from './lesson'
import { Filter } from './filter'
import { Button } from 'antd'
import { FlexColumn } from '../../components/FlexColumn'
import { QuestionType } from '../../enums'

const defaultLimit = 20

function WorkOut() {
  const [selectedTag, setSelectedTag] = useState<string | undefined>()
  const [limit, setLimit] = useState<number | undefined>(defaultLimit)
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.ShowAnswer
  )
  const [filterReady, setFilterReady] = useState<boolean>(false)

  return filterReady ? (
    <Lesson tag={selectedTag} limit={limit} questionType={questionType} />
  ) : (
    <FlexColumn>
      <Filter
        selectTag={setSelectedTag}
        defaultLimit={defaultLimit}
        setLimit={setLimit}
        questionType={questionType}
        setQuestionType={setQuestionType}
      />
      <Button onClick={() => setFilterReady(true)}>Go!</Button>
    </FlexColumn>
  )
}

export default WorkOut
