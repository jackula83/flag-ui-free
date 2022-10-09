import React from 'react';

type Props = React.HTMLAttributes<HTMLTextAreaElement> & {
  title: string,
  value: string,
};

export const TextArea = ({id, value, title, children, ...props}: Props) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{title}</label>
      <textarea 
        className="form-control" 
        id={id} 
        rows={4}
        value={value}
        {...props}
      />
    </div>
  )
}