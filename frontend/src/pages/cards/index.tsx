import React, { useState } from 'react'
import { Button, Input, Table } from 'antd'
import { Question } from '../../types'
import { ColumnsType, TableProps } from 'antd/es/table'
import { useQuestions } from '../../hooks/useQuestions'
import { useTags } from '../../hooks/useTags'
import { ColumnTextFilter } from '../../components/ColumnTextFilter'

const DEFAULT_PAGE_SIZE = 10

const Cards: React.FC = () => {
  const { tags } = useTags()

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const [filters, setFilters] = useState<{
    item?: string[] | null
    tags?: string[] | null
  }>({})

  const { questions, questionsCount, loading } = useQuestions({
    item: filters.item ? filters.item[0] : undefined,
    tag: filters.tags ? filters.tags[0] : undefined,
    page: pagination.page,
    limit: pagination.pageSize,
  })

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
    <Table<Question>
      dataSource={questions}
      columns={columns}
      loading={loading}
      rowKey="_id"
      onChange={onChange}
      pagination={{
        position: ['bottomCenter'],
        total: questionsCount,
        defaultPageSize: DEFAULT_PAGE_SIZE,
        onChange: handlePaginationChange,
      }}
    />
  )
}

export default Cards
