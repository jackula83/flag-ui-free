import React from 'react';
import { RowCol } from './RowCol';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const Row = ({children, ...props}: Props) => {
  return (
    <div className="row" {...props}>
      {children}
    </div>
  );
}

Row.Col = RowCol;