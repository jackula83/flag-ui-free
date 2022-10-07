import { useContext, useEffect, useState } from "react";
import { Flag, Voidable } from '@flagcar/types';
import { FlagContext } from "features/flags/FlagProvider";
import { useParams } from "react-router-dom";

const FlagEdit = () => {

  const { flagUuid } = useParams<string>();
  const flagContext = useContext(FlagContext);

  const [flag, setFlag] = useState<Flag>({} as Flag);
  const [serveValueDropdownOpen, setServeValueDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    setFlag(flagContext.flags!.find(f => f.uuid === flagUuid)!)
  }, [])

  const renderFlagHeader = () => (
      <div className="card mb-5">
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <h4 className="card-title">
                <a className='text-dark text-decoration-none text-lowercase' href='#'>{flag?.name}</a>
              </h4>
            </div>
            <div className="col-6">
              <div className="text-end">
              {flag?.isEnabled 
                ? <label className="badge badge-success" onClick={handleToggle}>Toggled On</label>
                : <label className="badge badge-secondary" onClick={handleToggle}>Toggled Off</label>
              }
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="form-group">
              <label htmlFor="txtDescription">Description</label>
              <textarea 
                className="form-control" 
                id="txtDescription" 
                rows={4}
                value={flag.description}
                onChange={(e) => handleDescriptionChange(e.target.value)} 
              />
            </div>
          </div>
        </div>
      </div>
  );

  const renderFlagValue = () => (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <h3 className="card-title">
              <a className='text-dark text-decoration-none text-capitalize' href='#'>State Value</a>
            </h3>
          </div>
          <hr />
          <div className="row container">
            <select 
              id="serveValue" 
              className="form-select form-select-sm"
              onChange={(e) => handleServeValueChange(e.target.value)}
            >
              <option selected={flag.defaultServeValue?.state}>True</option>
              <option selected={flag.defaultServeValue?.state}>False</option>
              <option disabled={true}>Custom</option> 
            </select>
          </div>
        </div>
      </div>    
  );

  const handleToggle = () => {
    const toggledFlag: Voidable<Flag> = {...flag, isEnabled: !flag?.isEnabled};
    setFlag(toggledFlag);
  }

  const handleDescriptionChange = (value: string) => {
    setFlag({...flag, description: value});
  }

  const handleServeValueChange = (value: string) => {
    setFlag({...flag, defaultServeValue: {state: value === 'True'}})
  }

  const handleSaveChanges = () => {
    flagContext.
  }

  return (
    <>
      {renderFlagHeader()}
      {renderFlagValue()}
      <div className="pt-5 text-end">
        <div className="btn btn-primary">
          <i className="mdi mdi-content-save me-2"></i>
          Apply Changes
        </div>
        <div className="btn btn-dark ms-3 disabled">
          <i className="mdi mdi-zip-box me-2"></i>
          Archive Flag
        </div>
      </div>
    </>
  );
}

export default FlagEdit;