import React from 'react';
import { CardBody } from './CardBody';
import { CardTitle } from './CardTitle';
import { CardDescription } from './CardDescription';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const Card = ({children, ...props}: Props) => {
  return (
    <div className={`card mb-3`} {...props}>
      {children}
    </div>
  )
}

Card.Body = CardBody;
Card.Title = CardTitle;
Card.Description = CardDescription;