import React, { useCallback, useContext, useEffect, useState } from 'react';
import FlagCard from './FlagCard';
import { Flag, ListFlags } from '../../../operations/flag';
import { FlagContext } from '../../../providers/FlagProvider';

const FlagPage: React.FC<any> = () => {
  
  const flagContext = useContext(FlagContext);
  const flagData = flagContext.list();

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