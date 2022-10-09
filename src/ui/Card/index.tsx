import React from 'react';
import { CardBody } from './CardBody';
import { CardTitle } from './CardTitle';
import { CardDescription } from './CardDescription';

export const Card = ({children, ...props}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="card" {...props}>
      {children}
    </div>
  )
}

Card.Body = CardBody;
Card.Title = CardTitle;
Card.Description = CardDescription;