import React, { useContext,  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FormFeedback, 
  FormGroup, 
  Input, 
  Label, 
  Modal, 
  ModalBody, 
  ModalFooter, 
  ModalHeader 
} from 'reactstrap';
import { FlagContext } from 'features/flags/FlagProvider';
import { useFlagList } from 'features/flags/FlagProvider/hooks';
import { FlagEditRoute } from 'pages/routes';
import FlagCard from './FlagCard';
import { Row } from 'ui/Row';

const FlagList = () => {
  
  const flagNameFieldId = 'flagName';
  const flagDescriptionFieldId = 'flagDescription';

  const flagContext = useContext(FlagContext);
  const flagData = useFlagList();
  const navigate = useNavigate();
  
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
    else if (flagContext.flags?.find(f => f.name === value.toLowerCase()))
      return 'Flag already exists, please choose another name';
  }

  const handleFlagNameOnChange = (value: string) => {
    const errorMessage = validateFlagName(value);
    if (errorMessage) setFlagNameError(errorMessage);
    else setFlagNameError('');
    setFlagName(value);
  }

  const handleFlagDescriptionOnchange = (value: string) => {
    setFlagDescription(value);
  }

  const handleSubmitFlag = async () => {
    const errorMessage = validateFlagName(flagName);
    if (errorMessage) {
      setFlagNameError(errorMessage);
      return;
    }
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

  const addFlagModalBody = () => {
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

  const addFlagModalFooter = () => {
    return (
      <>
        <div className="btn btn-gradient-primary" onClick={() => handleSubmitFlag()}>+ Add</div>
        <div className="btn btn-gradient-second" onClick={() => handleOnModalClose()}>Cancel</div>
        {
          submitErrorMessage && 
          <>
            <Input invalid hidden />
            <FormFeedback className='text-center'>{submitErrorMessage}</FormFeedback>
          </>
        }
      </>
    )
  }

  const addFlagModal = () => {    
    return (
      <Modal 
        isOpen={addModalOpen} 
        toggle={() => setAddModalOpen(!addModalOpen)}
        onClosed={() => handleOnModalClose()}
      >
        <ModalHeader>Add a new flag</ModalHeader>
        <ModalBody>{addFlagModalBody()}</ModalBody>
        <ModalFooter>{addFlagModalFooter()}</ModalFooter>
      </Modal>
    );
  }

  return (
    <>
      <Row>
        <Row.Col size={12}>
          <div
            className="btn btn-gradient-primary my-3"
            onClick={() => setAddModalOpen(true)}>+ Add Flag</div>
        </Row.Col>
      </Row>
      <Row>        
        {flagData && flagData.map(flag => 
          <Row.Col size={12} key={flag.name}>
            <FlagCard flag={flag} />
          </Row.Col>)}
      </Row>
      
      {addFlagModal()}
    </>      
  )
}

export default FlagList;