import React from 'react'
import { Flag } from '../../../operations/queries/flag'

interface IProps {
  flag: Flag
}

const FlagCard: React.FC<IProps> = ({flag}) => {
  const onButton = <div className="btn btn-gradient-success btn-rounded">On</div>
  const offButton = <div className="btn btn-gradient-light btn-rounded">Off</div>
  return (
    <>
      <div className="card">
        <div className="card-body py-3">
          <div className="row">
            <div className="col-10">
              <h4 className="card-title">{flag.name}</h4>
              <p className="card-description m-1">{flag.description}</p>
            </div>
            <div className="col">
              {flag.isEnabled ? onButton : offButton}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FlagCard