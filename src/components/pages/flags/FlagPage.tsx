import React from 'react';
import FlagCard from './FlagCard';
import { ListFlags } from './../../../operations/queries/flag';

const FlagPage: React.FC<any> = () => {

  const flagData = ListFlags();

  return (
    <>
      <div className="row">        
          {flagData && flagData.map(flag => 
          <div className="col-12 grid-margin" key={flag.name}>
            <FlagCard flag={flag} />
          </div>)}
      </div>
    </>      
  )
}

export default FlagPage;