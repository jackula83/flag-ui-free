import React from 'react';
import styled from 'styled-components';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  padding?: number,
  margin?: number,
  fade?: boolean
}

export const CardDescription = ({padding = 0, margin = 0, fade = false, children, ...props}: Props) => {

  const descriptionElements = (
    <p className={`card-description p-${padding} m-${margin}`} {...props}>
      {children}
    </p>)

  const fadedDescriptionElements = (
    <FadeWrapper>
      {descriptionElements}
    </FadeWrapper>
  )

  if (fade) return fadedDescriptionElements;
  return descriptionElements;
}

const FadeWrapper = styled.div`
  p {
    content: '';
    overflow: hidden;    
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical; 
  }

  p:after {
    content: '';
    bottom: 0;
    right: 0;
    width: 100%;
    height: 25%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 70%);
    position: absolute;
  }
`