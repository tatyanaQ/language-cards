import React, { useState } from 'react'
import { Lesson } from './lesson'
import { Filter } from './filter'
import { Button } from 'antd'

function App() {
  const [selectedTag, setSelectedTag] = useState<string | undefined>()
  const [filterReady, setFilterReady] = useState<boolean>(false)

  const selectTag = (tag) => {
    setSelectedTag(tag)
  }

  return filterReady ? (
    <Lesson tag={selectedTag} />
  ) : (
    <>
      <Filter selectTag={selectTag} />
      <Button onClick={() => setFilterReady(true)}>Start</Button>
    </>
  )
}

export default App
