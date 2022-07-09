import React from 'react';
import { ListFlags } from './../operations/queries/flag';

const FlagList: React.FC = () => {
  // temporary prototype for visualisation only

  const flags = ListFlags();

    if (!flags) return (<p>Loading...</p>);

  return (
    <>
      {flags.map(f => f.name)}
    </>
  )
}

export default FlagList;
