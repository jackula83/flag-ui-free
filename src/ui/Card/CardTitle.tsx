import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  value: string,
  styling?: string
};

export const CardTitle = ({value, styling = undefined, children, ...props}: Props) => {
  const textStylingClassName = styling ? `text-${styling}` : '';
  return (
    <div className="card-title" {...props}>
      <a className={`text-dark text-decoration-none ${textStylingClassName}`} href='#'>{value}</a>
    </div>
  )
}