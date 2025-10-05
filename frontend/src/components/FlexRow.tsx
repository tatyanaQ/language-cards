import React from 'react'

export const FlexRow: React.FC<
  React.PropsWithChildren<{
    style?: React.CSSProperties
  }>
> = ({ style, children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        alignItems: 'baseline',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
