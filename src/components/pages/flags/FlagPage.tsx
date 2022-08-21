import React from 'react';
import { Flag } from '../../../operations/queries/flag';
import FlagCard from './FlagCard';

const FlagPage: React.FC<any> = () => {

  const flagList: Flag[] = [{
      name: 'test-flag-1',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto provident sapiente ab libero culpa id, voluptate eos totam dignissimos sequi, molestias, illum aliquid ipsa consequatur.',
      alias: 'test-flag-alias',
      isEnabled: true,
    }, {
      name: 'test-flag-2',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto provident sapiente ab libero culpa id, voluptate eos totam dignissimos sequi, molestias, illum aliquid ipsa consequatur.',
      alias: 'test-flag-alias',
      isEnabled: true,
    }, {
      name: 'test-flag-3',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto provident sapiente ab libero culpa id, voluptate eos totam dignissimos sequi, molestias, illum aliquid ipsa consequatur.',
      alias: 'test-flag-alias',
      isEnabled: false,
    }
  ];

  // console.log(flagList);

  return (
    <>
      <div className="row">
        
          {flagList.map(flag => 
          <div className="col-12 grid-margin stretch-card" key={flag.name}>
            <FlagCard flag={flag} />
          </div>)}
      </div>
    </>      
  )
}

export default FlagPage;