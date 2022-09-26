import React, { useContext, useEffect, useState } from 'react';
import FlagCard from './FlagCard';
import { FlagContext } from '../../../providers/FlagProvider';
import { FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { FlagEditRoute } from '../../../routes';
import { FlagRoute } from './../../../routes';

const FlagPage: React.FC<any> = ({}) => {
  
  const flagNameFieldId = 'flagName';
  const flagDescriptionFieldId = 'flagDescription';

  const navigate = useNavigate();
  const flagContext = useContext(FlagContext);
  const flagData = flagContext.list();
  
  const [isAddFlagModalOpen, setAddFlagModalOpen] = useState<boolean>(false);
  const [flagName, setFlagName] = useState<string>('');
  const [flagDescription, setFlagDescription] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    const initialFieldErrors = new Map();
    initialFieldErrors.set(flagNameFieldId, false);
    initialFieldErrors.set(flagDescriptionFieldId, false);
    setFieldErrors(initialFieldErrors);
  }, [])

  const setFieldError = (id: string, error: boolean) => {
    fieldErrors!.set(id, error);
    setFieldErrors(fieldErrors);
  }

  const handleFlagNameOnChange = (value: string) => {
    if (value.length < 4) setFieldError(flagNameFieldId, true);
    else setFieldError(flagNameFieldId, false);    
    setFlagName(value);
  }

  const handleFlagDescriptionOnchange = (value: string) => {
    setFlagDescription(value);
  }

  const handleAddFlag = async () => {
    const flag = await flagContext.add(flagName, flagDescription);
    if (!flag) return;
    navigate(`${FlagRoute}/${flag.uuid}`);
  }

  const handleOnModalClose = () => {
    setFlagName('');
    setFlagDescription('');
    const updatedFieldErrors = new Map();
    fieldErrors.forEach((_, k) => {
      updatedFieldErrors.set(k, false);
    });
    setFieldErrors(updatedFieldErrors);
  }

  const addFlagForm = () => {
    return (
      <>
        <FormGroup>
          <Label for={flagNameFieldId}>Flag Name</Label>
          <Input 
            id={flagNameFieldId} 
            placeholder="flag-name" 
            value={flagName} 
            maxLength={500}
            onChange={(e) => handleFlagNameOnChange(e.target.value)}
            invalid={fieldErrors.get(flagNameFieldId)}
          />
          <FormFeedback>Flag name must be at least 4 characters</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for={flagDescriptionFieldId}>Description</Label>
          <Input 
            id={flagDescriptionFieldId}
            type="textarea"
            value={flagDescription}
            maxLength={4000} 
            onChange={(e) => handleFlagDescriptionOnchange(e.target.value)}
          />
        </FormGroup>
      </>
    );
  }

  const addFlagModal = () => {    
    return (
      <Modal 
        isOpen={isAddFlagModalOpen} 
        toggle={() => setAddFlagModalOpen(!isAddFlagModalOpen)}
        onClosed={() => handleOnModalClose()}
      >
        <ModalHeader toggle={() => setAddFlagModalOpen(!isAddFlagModalOpen)}>
          Add a new flag
        </ModalHeader>
        <ModalBody>
          {addFlagForm()}
        </ModalBody>
        <ModalFooter>
          <div className="btn btn-gradient-primary" onClick={() => handleAddFlag()}>Do Something</div>
          <div className="btn btn-gradient-second" onClick={() => handleOnModalClose()}>Cancel</div>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div
            className="btn btn-gradient-primary my-3"
            onClick={() => setAddFlagModalOpen(true)}>+ Add Flag</div>
        </div>
      </div>
      <div className="row">        
          {flagData && flagData.map(flag => 
          <div className="col-12 grid-margin" key={flag.name}>
            <FlagCard flag={flag} />
          </div>)}
      </div>
      
      {addFlagModal()}
    </>      
  )
}

export default FlagPage;