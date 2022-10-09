import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  size?: number
}

export const RowCol = ({size = undefined, children, ...props}: Props) => {
  if (size && size > 12) size = undefined;
  const className = size ? `col-${size}` : 'col';
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}