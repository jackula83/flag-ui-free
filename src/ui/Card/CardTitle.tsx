import React from 'react';
import { Voidable } from '@flagcar/types';
import { TextStyle, textStylingMap } from 'ui/common/textStyle';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  value: string,
  styling?: Voidable<TextStyle>
};

export const CardTitle = ({value, styling = undefined, children, ...props}: Props) => {
  const textStylingClassName = styling ? textStylingMap.get(styling) : '';
  return (
    <div className="card-title" {...props}>
      <a className={`text-dark text-decoration-none ${textStylingClassName}`} href='#'>{value}</a>
    </div>
  )
}