import React from 'react';
import { BadgeType } from 'ui/enums/badgeTypes';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  type: BadgeType
}

export const Badge = ({type, children, ...props}: Props) => {
  return (
    <div className={`badge ${type}`} {...props}>
      {children}
    </div>
  )
}