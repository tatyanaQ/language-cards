import React, { useState } from 'react'
import { Input, Select } from 'antd'
import { FlexRow } from '../../components/FlexRow'
import { FlexColumn } from '../../components/FlexColumn'
import { useTags } from '../../hooks/useTags'

export const Filter: React.FC<{
  selectTags: (tags: string[] | undefined) => void
  defaultLimit?: number
  setLimit: (limit: number) => void
}> = ({ selectTags, defaultLimit, setLimit }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const { tags, loading: tagsLoading } = useTags()

  const onTagSelect = (value: string[]) => {
    setSelectedTags(value)
    selectTags(value.length ? value : undefined)
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
    </FlexColumn>
  )
}
