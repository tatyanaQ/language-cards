import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { Question } from '../../types'
import { ColumnsType } from 'antd/es/table'
import { useQuestions } from '../../hooks/useQuestions'

const DEFAULT_PAGE_SIZE = 2

const Cards: React.FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const { questions, questionsCount, loading } = useQuestions({
    page: pagination.page,
    limit: pagination.pageSize,
  })

  const columns: ColumnsType<Question> = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
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
      render: (tags: string[]) => tags.join(', '),
    },
  ]

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ page, pageSize })
  }

  return (
    <Table<Question>
      dataSource={questions}
      columns={columns}
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
