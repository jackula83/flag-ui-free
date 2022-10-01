import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FlagContext } from 'features/flags/FlagProvider';
import { createLock, makeExclusiveRequest } from 'features/core/utils';
import { FlagEditRoute } from 'pages/routes';
import { Flag, Lock } from '@flagcar/types';

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
    <Wrapper>
      <div className="card">
        <div className="card-body py-3">
          <div className="row">
            <div className="col-10">
              <h4 className="card-title" onClick={handleTitleClick}>
                <a className='text-dark text-decoration-none text-lowercase' href='#'>{flag.name}</a></h4>
              <p className="card-description m-1">{flag.description}</p>
            </div>
            <div className="col-2">
              {flag.isEnabled ? onButton : offButton}
            </div>
          </div>
        </div>
      </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  .card {
    overflow: hidden;
  } 

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

export default FlagCard