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
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae hic tempora omnis numquam, odit dicta eligendi? Recusandae quibusdam pariatur quos esse eum voluptatum facilis ipsa eaque maiores sequi iure, debitis obcaecati officia est, praesentium reiciendis assumenda vero tempore accusamus inventore. Eligendi quidem perspiciatis numquam dolores sed consequatur nemo ducimus quo architecto iure? Odit porro, quae exercitationem suscipit, corrupti quo sunt sint quisquam delectus optio pariatur? Autem libero, vero facilis maiores, nesciunt amet voluptas sunt, quam architecto veritatis ipsa magnam inventore aut officia saepe. Minus, officiis et. Distinctio reiciendis perferendis numquam maiores ea aut vitae, voluptates similique, dolorum recusandae vel at?',
      alias: 'test-flag-alias',
      isEnabled: true,
    }, {
      name: 'test-flag-3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis nulla voluptatem vitae tenetur, assumenda quibusdam nobis esse cupiditate temporibus pariatur fuga, laborum beatae hic ipsa?',
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