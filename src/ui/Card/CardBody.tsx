import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  padding?: number,
  margin?: number
}

export const CardBody = ({padding = 4, margin = 0, children, ...props}: Props) => {
  return (
    <div className={`card-body p-${padding} m-${margin}`} {...props}>
      {children}
    </div>
  )
}