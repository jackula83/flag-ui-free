import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean,
  rounded?: boolean,
  gradient?: boolean,
};

const makeButton = (buttonStyle = 'primary'): (props: Props) => JSX.Element => {
  return ({
    disabled = false, 
    rounded = false, 
    gradient = false, 
    children, 
    ...props
  }: Props) => (
    <div className={`
        btn 
        btn-${gradient ? 'gradient-' : ''}${buttonStyle} 
        ${rounded ? 'btn-rounded' : ''}
        ${disabled ? 'disabled' : ''}`
      } {...props}>
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
Button.Success = makeButton('success');
Button.Light = makeButton('light');