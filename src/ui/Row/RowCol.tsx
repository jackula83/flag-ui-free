import React from 'react';
import { Align, textAlignmentMap } from 'ui/common/align';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  size?: number
  align?: Align
}

export const RowCol = ({size = undefined, align = Align.Left, children, ...props}: Props) => {
  if (size && size > 12) size = undefined;


  const colSize = size ? `col-${size}` : 'col'
  const textAlign = textAlignmentMap.get(align);

  return (
    <div className={`${colSize} ${textAlign}`} {...props}>
      {children}
    </div>
  )
}