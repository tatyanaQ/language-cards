import React, { useState, useEffect } from 'react'
import { Select } from 'antd'

const emptyValue = '-'

async function fetchTags() {
  const resp = await fetch('api/tags')
  return await resp.json()
}

export const Filter: React.FC<{
  selectTag: (string) => void
}> = ({ selectTag }) => {
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
    </>
  )
}
