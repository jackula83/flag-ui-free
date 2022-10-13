import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean
};

const makeButton = (buttonStyle = 'primary'): (props: Props) => JSX.Element => {
  return ({disabled = false, children, ...props}: Props) => (
    <div className={`btn btn-${buttonStyle} ${disabled ? 'disabled' : ''}`} {...props}>
      {children}
    </div>  
  );
}

export const Button = (props: Props) => (
  <>
    {makeButton()(props)}
  </>
);

Button.Primary = makeButton('primary');
Button.Dark = makeButton('dark');