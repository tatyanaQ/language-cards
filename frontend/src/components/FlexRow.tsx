import React from 'react'

export const FlexRow: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        alignItems: 'baseline',
      }}
    >
      {children}
    </div>
  )
}
