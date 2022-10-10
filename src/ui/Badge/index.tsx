import React from 'react';
import { BadgeTypes, badgeTypeMap } from './attributes';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  type: BadgeTypes
}

export const Badge = ({type, children, ...props}: Props) => {
  return (
    <div className={`badge ${badgeTypeMap.get(type)}`} {...props}>
      {children}
    </div>
  )
}