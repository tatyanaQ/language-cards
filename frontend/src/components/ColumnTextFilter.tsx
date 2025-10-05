import { Button, Input } from 'antd'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { FlexRow } from './FlexRow'

export const ColumnTextFilter = ({
  setSelectedKeys,
  selectedKeys,
  clearFilters,
  confirm,
  close,
}: FilterDropdownProps) => (
  <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
    <Input
      value={selectedKeys[0]}
      onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
      onPressEnter={() => {
        confirm()
        close()
      }}
      style={{ marginBottom: 8, display: 'block' }}
    />
    <FlexRow style={{ justifyContent: 'space-between' }}>
      <Button
        onClick={() => clearFilters && clearFilters()}
        size="small"
        type="link"
        disabled={!selectedKeys[0]}
      >
        Reset
      </Button>
      <Button
        size="small"
        type="primary"
        onClick={() => {
          confirm()
        }}
      >
        OK
      </Button>
    </FlexRow>
  </div>
)
