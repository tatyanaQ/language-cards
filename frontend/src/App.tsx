import React, { useState } from 'react'
import { Lesson } from './lesson'
import { Filter } from './filter'
import { Button } from 'antd'

function App() {
  const [selectedTag, setSelectedTag] = useState<string | undefined>()
  const [limit, setLimit] = useState<number | undefined>()
  const [filterReady, setFilterReady] = useState<boolean>(false)

  return filterReady ? (
    <Lesson tag={selectedTag} limit={limit} />
  ) : (
    <>
      <Filter selectTag={setSelectedTag} setLimit={setLimit} />
      <Button onClick={() => setFilterReady(true)}>Start</Button>
    </>
  )
}

export default App
