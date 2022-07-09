import React from 'react';
import { ListFlags } from './../operations/queries/flag';
import FlagCard from './FlagCard';

const FlagList: React.FC = () => {
  // temporary prototype for visualisation only
  const flags = ListFlags();

  if (!flags) return (<p>Loading...</p>);

  return (
    <>
      {flags.map(f => <FlagCard key={f.name} flag={f} />)}
    </>
  )
}

export default FlagList;
