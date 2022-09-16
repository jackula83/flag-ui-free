import React from 'react'
import { Flag } from '../../../operations/flag'
import styled from 'styled-components';

interface IProps {
  flag: Flag
}

// http://jsfiddle.net/b9vtW/4/

const FlagCard: React.FC<IProps> = ({flag}) => {
  const onButton = <div className="btn btn-gradient-success btn-rounded">On</div>
  const offButton = <div className="btn btn-gradient-light btn-rounded">Off</div>
  return (
    <>
    <Wrapper>
      <div className="card">
        <div className="card-body py-3">
          <div className="row">
            <div className="col-10">
              <h4 className="card-title">{flag.name}</h4>
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