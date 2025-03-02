import React, { useState, useEffect } from 'react'
import { Input, Select } from 'antd'
import { fetchTags } from './api'

const emptyValue = '-'

export const Filter: React.FC<{
  selectTag: (string) => void
  setLimit: (number) => void
}> = ({ selectTag, setLimit }) => {
  const [tags, setTags] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string | undefined>()

  useEffect(() => {
    fetchTags().then((response) => setTags(response.tags))
  }, [])

  const onTagSelect = (t) => {
    setSelectedTag(t)
    selectTag(t === emptyValue ? undefined : t)
  }

  return (
    <>
      <Select
        options={[emptyValue, ...tags].map((tag) => ({
          label: tag,
          value: tag,
        }))}
        onSelect={onTagSelect}
        value={selectedTag}
        style={{ minWidth: '150px' }}
      />
      <Input type="number" onChange={(e) => setLimit(e.target.value)} />
    </>
  )
}
