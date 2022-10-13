import React from 'react';
import { Align } from 'ui/common/align';
import { HMargin, VMargin } from './Margin';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  align?: Align
};

export const Container = ({align = Align.Left, children, ...props}: Props) => {
  return (
    <div className={`${align} p-0`} {...props}>{children}</div>
  )
}

Container.VMargin = VMargin;
Container.HMargin = HMargin;