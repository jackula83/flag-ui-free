import React from 'react';
import { RowCol } from './RowCol';

export const Row = ({children, ...props}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="row" {...props}>
      {children}
    </div>
  )
}

Row.Col = RowCol;