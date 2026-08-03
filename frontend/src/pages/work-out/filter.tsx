import React, { useState } from 'react'
import { Input, Select } from 'antd'
import { FlexRow } from '../../components/FlexRow'
import { FlexColumn } from '../../components/FlexColumn'
import { QuestionType } from '../../enums'
import { useTags } from '../../hooks/useTags'

export const Filter: React.FC<{
  selectTags: (tags: string[] | undefined) => void
  defaultLimit?: number
  setLimit: (limit: number) => void
  questionType: string
  setQuestionType: (questionType: string) => void
}> = ({ selectTags, defaultLimit, setLimit, questionType, setQuestionType }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const { tags, loading: tagsLoading } = useTags()

  const onTagSelect = (value: string[]) => {
    setSelectedTags(value)
    selectTags(value.length ? value : undefined)
  }

  const onQuestionTypeSelect = (qt) => {
    setQuestionType(qt)
  }

  return (
    <FlexColumn>
      <FlexRow>
        <>Tags:</>
        <Select
          mode="multiple"
          allowClear
          placeholder="Select tags"
          options={tags.map((tag) => ({
            label: tag,
            value: tag,
          }))}
          onChange={onTagSelect}
          value={selectedTags}
          style={{ minWidth: '180px' }}
          loading={tagsLoading}
        />
      </FlexRow>

      <FlexRow>
        <>Limit</>
        <Input
          type="number"
          defaultValue={defaultLimit}
          onChange={(e) => setLimit(Number(e.target.value))}
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
