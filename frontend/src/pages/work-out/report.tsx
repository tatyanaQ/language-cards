import React from 'react'
import { Button, Table } from 'antd'
import { Question } from '../../types'
import { ColumnsType } from 'antd/es/table/interface'

export const Report: React.FC<{
  questions: Question[]
}> = ({ questions }) => {
  const finish = () => {
    window.location.reload()
    return
  }

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
      title: 'See card',
      key: 'see-card',
      dataIndex: '_id',
      render: (_id: string) => (
        <a href={`/cards/${_id}`} target="_blank" rel="noopener noreferrer">
          ↗️
        </a>
      ),
    },
  ]

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 0' }}>
      <h3 style={{ marginBottom: 8 }}>Lesson report</h3>
      <Table<Question>
        dataSource={questions}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />
      <div style={{ marginTop: 24 }}>
        <Button onClick={finish}>Start over</Button>
      </div>
    </div>
  )
}
