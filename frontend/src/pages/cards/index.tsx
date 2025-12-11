import React, { useState } from 'react'
import { Table } from 'antd'
import { Switch } from 'antd'
import { Button } from 'antd'
import { Question } from '../../types'
import { ColumnsType, TableProps } from 'antd/es/table'
import { useQuestions } from '../../hooks/useQuestions'
import { useTags } from '../../hooks/useTags'
import { ColumnTextFilter } from '../../components/ColumnTextFilter'
import NewYearMood from './NewYearMood'

const DEFAULT_PAGE_SIZE = 10

const Cards: React.FC = () => {
  const { tags } = useTags()

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const [filters, setFilters] = useState<{
    item?: string[] | null
    translation?: string[] | null
    tags?: string[] | null
  }>({})

  const { questions, questionsCount, loading } = useQuestions({
    item: filters.item ? filters.item[0] : undefined,
    translation: filters.translation ? filters.translation[0] : undefined,
    tag: filters.tags ? filters.tags[0] : undefined,
    page: pagination.page,
    limit: pagination.pageSize,
  })

  const [celebrateCounter, setCelebrateCounter] = useState(0)
  const [festiveEnabled, setFestiveEnabled] = useState(true)

  const columns: ColumnsType<Question> = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
      filterDropdown: ColumnTextFilter,
    },
    {
      title: 'Translation',
      dataIndex: 'translation',
      key: 'translation',
      filterDropdown: ColumnTextFilter,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      filters: tags.map((tag) => ({ text: tag, value: tag })),
      filterSearch: true,
      render: (tags: string[]) => tags.join(', '),
    },
  ]

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ page, pageSize })
  }

  const onChange: TableProps<Question>['onChange'] = (
    pagination,
    tableFilters,
    sorter,
    extra: any
  ) => {
    switch (extra.action) {
      case 'filter':
        setFilters(tableFilters)
        break
      default:
        break
    }
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <NewYearMood enabled={festiveEnabled} celebrate={celebrateCounter} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: '#333', opacity: 0.8 }}>New Year Mood</span>
          <Switch
            checked={festiveEnabled}
            onChange={(v) => setFestiveEnabled(v)}
          />
          <Button
            type="primary"
            ghost
            onClick={() => setCelebrateCounter((c) => c + 1)}
          >
            Celebrate!
          </Button>
        </div>
      </div>
      <Table<Question>
        dataSource={questions}
        columns={columns}
        loading={loading}
        rowKey="_id"
        onRow={(record) => ({
          onClick: () => {
            window.open(`/cards/${record._id}`, '_blank', 'noopener,noreferrer')
          },
          style: { cursor: 'pointer' },
        })}
        onChange={onChange}
        pagination={{
          position: ['bottomCenter'],
          total: questionsCount,
          defaultPageSize: DEFAULT_PAGE_SIZE,
          onChange: handlePaginationChange,
        }}
      />
    </div>
  )
}

export default Cards
