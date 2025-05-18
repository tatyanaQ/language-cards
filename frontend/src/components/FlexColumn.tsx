import React from 'react'

export const FlexColumn: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'baseline',
      }}
    >
      {children}
    </div>
  )
}
