import React from 'react';
import { Align, } from 'ui/common/align';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  size?: number
  align?: Align
}

export const RowCol = ({size = undefined, align = Align.Left, children, ...props}: Props) => {
  if (size && size > 12) size = undefined;

  const colSize = size ? `col-${size}` : 'col'

  return (
    <div className={`${colSize} ${align}`} {...props}>
      {children}
    </div>
  )
}