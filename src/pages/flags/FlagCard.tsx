import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FlagContext } from 'features/flags/FlagProvider';
import { createLock, makeExclusiveRequest } from 'features/core/utils';
import { FlagEditRoute } from 'pages/routes';
import { Flag, Lock } from '@flagcar/types';
import { Card } from 'ui/Card';
import { Row } from 'ui/Row';

type Props = {
  flag: Flag
}

const FlagCard = (props: Props) => {

  const flagContext = useContext(FlagContext);

  const [flag, setFlag] = useState<Flag>(props.flag);
  const toggleLock = useRef<Lock>(createLock());
  const navigate = useNavigate();

  const optimisticToggle = async (flagId: number) => {
    setFlag({...flag, isEnabled: !flag.isEnabled});
    const toggledFlag = await flagContext.toggle(flagId);
    if (toggledFlag) setFlag(toggledFlag);
    else setFlag({...flag, isEnabled: !flag.isEnabled});
  }

  const handleToggle = async (flagId: number) => {
    const toggleRequest = async () => await optimisticToggle(flagId);
    await makeExclusiveRequest(async () => {
      await toggleRequest()
    }, toggleLock.current);
  }

  const handleTitleClick = () => {
    navigate(`${FlagEditRoute}/${flag.uuid}`);
  }

  const onButton = 
    <div 
      className="btn btn-gradient-success btn-rounded"
      onClick={() => handleToggle(flag.id)}>
      On
    </div>

  const offButton = 
    <div className="btn btn-gradient-light btn-rounded"
      onClick={() => handleToggle(flag.id)}>
      Off
    </div>

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Row.Col size={10}>
              <Card.Title value={flag.name} textStyling="lowercase" onClick={handleTitleClick} />
              <Card.Description fade={true}>{flag.description}</Card.Description>
            </Row.Col>
            <Row.Col size={2}>
              {flag.isEnabled ? onButton : offButton}
            </Row.Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default FlagCard