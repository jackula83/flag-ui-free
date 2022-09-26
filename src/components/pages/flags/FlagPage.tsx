import React, { useContext, useEffect, useState } from 'react';
import FlagCard from './FlagCard';
import { FlagContext } from '../../../providers/FlagProvider';
import { FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { FlagEditRoute } from '../../../routes';

const FlagList = () => {
  
  const flagNameFieldId = 'flagName';
  const flagDescriptionFieldId = 'flagDescription';

  const navigate = useNavigate();
  const flagContext = useContext(FlagContext);
  const flagData = flagContext.list();
  
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [flagName, setFlagName] = useState<string>('');
  const [flagDescription, setFlagDescription] = useState<string>('');
  const [flagNameError, setFlagNameError] = useState<string>('');
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string>('');

  const validateFlagName = (value: string) => {
    if (value.length < 4) 
      return 'Flag name must be at least 4 characters';
    else if (/^[\w-]+$/.test(value) === false) 
      return 'Flag name can only contain - and alphanumeric characters';
    else if (flagContext.flags.findIndex(f => f.name === value))
      return 'Flag already exists, please choose another name';
  }

  const handleFlagNameOnChange = (value: string) => {
    const errorMessage = validateFlagName(value);
    if (errorMessage) {
      setFlagNameError(errorMessage);
      return;
    }
    setFlagNameError('');
    setFlagName(value);
  }

  const handleFlagDescriptionOnchange = (value: string) => {
    setFlagDescription(value);
  }

  const handleSubmitFlag = async () => {
    const errorMessage = validateFlagName(flagName);
    if (errorMessage) return;
    const flag = await flagContext.add(flagName, flagDescription);
    if (!flag) { 
      setSubmitErrorMessage('An unknown error had occured 😿');
      return; 
    }
    navigate(`${FlagEditRoute}/${flag.uuid}`);
  }

  const handleOnModalClose = () => {
    setFlagName('');
    setFlagDescription('');
    setSubmitErrorMessage('');
    setFlagNameError('');
    setAddModalOpen(false);
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
            invalid={flagNameError !== ''}
          />
          <FormFeedback>{flagNameError}</FormFeedback>
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
        isOpen={addModalOpen} 
        toggle={() => setAddModalOpen(!addModalOpen)}
        onClosed={() => handleOnModalClose()}
      >
        <ModalHeader toggle={() => setAddModalOpen(!addModalOpen)}>
          Add a new flag
        </ModalHeader>
        <ModalBody>
          {addFlagForm()}
        </ModalBody>
        <ModalFooter>
          <div className="btn btn-gradient-primary" onClick={() => handleSubmitFlag()}>+ Add</div>
          <div className="btn btn-gradient-second" onClick={() => handleOnModalClose()}>Cancel</div>
          {
            submitErrorMessage && 
            <>
              <Input invalid hidden />
              <FormFeedback className='text-center'>{submitErrorMessage}</FormFeedback>
            </>
          }
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
            onClick={() => setAddModalOpen(true)}>+ Add Flag</div>
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

export default FlagList;