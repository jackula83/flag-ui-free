import React, { useState } from 'react';
import styled from 'styled-components';

interface IProps {
  defaultState: boolean
  onToggle: (state: boolean) => void
}

const Toggle: React.FC<IProps> = ({defaultState, onToggle}) => {

  const [checked, setChecked] = useState<boolean>(defaultState);

  const handleChecked = () => {
    onToggle(!checked);
    setChecked(!checked);
  }

  return (
      <Wrapper>
        <CheckBox id="checkbox" type="checkbox" onChange={handleChecked} />
        <CheckBoxLabel htmlFor="checkbox" />
      </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 22px;
  border-radius: 15px;
  background: ${p => p.theme.secondary};
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 23px;
  &:checked + ${CheckBoxLabel} {
    background: ${p => p.theme.highlight};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

export default Toggle;