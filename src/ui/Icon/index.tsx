import React from 'react';
import { IconStyle } from 'ui/enums/icons';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  icon: IconStyle,
  isMenuIcon?: boolean
};

export const Icon = ({icon, isMenuIcon = false, children, ...props}: Props) => {
  return (
    <i className={`mdi ${icon} ${isMenuIcon ? 'menu-icon' : ''}`} {...props}>{children}</i>
  )
}