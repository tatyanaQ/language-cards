import React, { useState, useEffect } from 'react'
import { Input, Select } from 'antd'
import { fetchTags } from '../../api'
import { FlexRow } from '../../components/FlexRow'
import { FlexColumn } from '../../components/FlexColumn'
import { QuestionType } from '../../enums'
import { useTags } from '../../hooks/useTags'

const emptyValue = '-'

export const Filter: React.FC<{
  selectTag: (string) => void
  defaultLimit?: number
  setLimit: (number) => void
  questionType: string
  setQuestionType: (string) => void
}> = ({ selectTag, defaultLimit, setLimit, questionType, setQuestionType }) => {
  const [selectedTag, setSelectedTag] = useState<string | undefined>()

  const { tags, loading: tagsLoading } = useTags()

  const onTagSelect = (t) => {
    setSelectedTag(t)
    selectTag(t === emptyValue ? undefined : t)
  }

  const onQuestionTypeSelect = (qt) => {
    setQuestionType(qt)
  }

  return (
    <FlexColumn>
      <FlexRow>
        <>Tags:</>
        <Select
          options={[emptyValue, ...tags].map((tag) => ({
            label: tag,
            value: tag,
          }))}
          onSelect={onTagSelect}
          value={selectedTag}
          style={{ minWidth: '150px' }}
          loading={tagsLoading}
        />
      </FlexRow>

      <FlexRow>
        <>Limit</>
        <Input
          type="number"
          defaultValue={defaultLimit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </FlexRow>

      <FlexRow>
        <>Question type:</>
        <Select
          options={Object.values(QuestionType).map((qt) => ({
            label: qt,
            value: qt,
          }))}
          onSelect={onQuestionTypeSelect}
          value={questionType}
          style={{ minWidth: '150px' }}
        />
      </FlexRow>
    </FlexColumn>
  )
}
