import React, { useState } from 'react'
import { Lesson } from './lesson'
import { Filter } from './filter'
import { Button } from 'antd'
import { FlexColumn } from '../../components/FlexColumn'

const defaultLimit = 20

function WorkOutAi() {
  const [selectedTags, setSelectedTags] = useState<string[] | undefined>()
  const [limit, setLimit] = useState<number | undefined>(defaultLimit)
  const [filterReady, setFilterReady] = useState<boolean>(false)

  return filterReady ? (
    <Lesson tags={selectedTags} limit={limit} />
  ) : (
    <FlexColumn>
      <Filter
        selectTags={setSelectedTags}
        defaultLimit={defaultLimit}
        setLimit={setLimit}
      />
      <Button onClick={() => setFilterReady(true)}>Go!</Button>
    </FlexColumn>
  )
}

export default WorkOutAi
