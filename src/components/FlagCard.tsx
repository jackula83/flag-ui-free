import React from 'react';
import styled from 'styled-components'
import { Flag } from '../operations/queries/flag';
import Toggle from './controls/toggle';

interface IProps {
  flag: Flag
}

const FlagCard: React.FC<IProps> = ({ flag }) => {
  const {name, defaultServeValue} = flag;
  
  const handleToggle = (state: boolean) => {
    // TBD update backend to set flag state
  }

  return (
    <Wrapper>
      <h4>{name}</h4>
      <Toggle defaultState={false} onToggle={handleToggle} />
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 90vw;
  max-width: 500px;
  border-radius: 0.25rem;
  border: 2px solid gray;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem;

  h4 {
    display: inline-block;
  }
`;

export default FlagCard;