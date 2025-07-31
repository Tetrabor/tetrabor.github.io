import React from 'react';

export function Columns({ children }) {
  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {children}
    </div>
  );
}

export function Column({ children }) {
  return <div style={{ flex: 1 }}>{children}</div>;
}
