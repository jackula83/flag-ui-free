type Props = React.HTMLAttributes<HTMLDivElement> & {
  size?: number,
  inline?: boolean
};

export const VMargin = ({size = 3, inline = false, children, ...props}: Props) => {
  return (
    <div className={`my-${size} ${inline ? 'd-inline' : ''}`} {...props}>{children}</div>
  )
}

export const HMargin = ({size = 3, inline = true, children, ...props}: Props) => {
  return (
    <div className={`mx-${size} ${inline ? 'd-inline' : ''}`} {...props}>{children}</div>
  )
}