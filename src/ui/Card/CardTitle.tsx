import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  value: string,
  textStyling?: string
};

export const CardTitle = ({value, textStyling = undefined, children, ...props}: Props) => {
  const textStylingClassName = textStyling ? `text-${textStyling}` : '';
  return (
    <div className="card-title" {...props}>
      <a className={`text-dark text-decoration-none ${textStylingClassName}`} href='#'>{value}</a>
    </div>
  )
}