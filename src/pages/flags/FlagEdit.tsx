import { useContext, useEffect, useState } from "react";
import { Flag, Voidable } from '@flagcar/types';
import { FlagContext } from "features/flags/FlagProvider";
import { useNavigate, useParams } from "react-router-dom";
import { FlagListRoute } from "pages/routes";
import { Card } from "ui/Card";
import { Row } from "ui/Row";
import { Align } from "ui/common/align";
import { TextArea } from "ui/TextArea";
import { Badge } from "ui/Badge";
import { BadgeTypes } from "ui/Badge/attributes";

const FlagEdit = () => {

  const { flagUuid } = useParams<string>();
  const flagContext = useContext(FlagContext);
  const navigate = useNavigate();

  const [flag, setFlag] = useState<Flag>({} as Flag);

  useEffect(() => {
    setFlag(flagContext.flags!.find(f => f.uuid === flagUuid)!)
  }, []);

  const renderFlagHeader = () => (
    <Card>
      <Card.Body>
        <Row>
          <Row.Col size={6}>
            <Card.Title styling="lowercase" value={flag.name} />
          </Row.Col>
          <Row.Col size={6} align={Align.Right}>
            {flag?.isEnabled 
              ? <Badge type={BadgeTypes.Success} onClick={handleToggle}>Toggled On</Badge>
              : <Badge type={BadgeTypes.Secondary} onClick={handleToggle}>Toggled Off</Badge>
            }
          </Row.Col>
        </Row>
        <hr />
        <Row>
          <TextArea 
            id="txtDescription" 
            title="Description" 
            value={flag.description} 
            onChange={(e) => handleDescriptionChange((e.target as HTMLTextAreaElement).value)} 
          />
        </Row>
      </Card.Body>
    </Card>
  );

  const renderFlagValue = () => (
    <Card>
      <Card.Body>
        <Row>
          <Card.Title styling="capitalize" value="State Value" />
        </Row>
        <hr />
        <Row>
          <Row.Col size={2}>
            <select 
              id="serveValue" 
              className="form-select form-select-sm"
              onChange={(e) => handleServeValueChange(e.target.value)}
            >
              <option selected={flag.defaultServeValue?.state}>True</option>
              <option selected={!flag.defaultServeValue?.state}>False</option>
              <option disabled={true}>Custom</option> 
            </select>
          </Row.Col>
        </Row>
      </Card.Body>
    </Card>
  );

  const handleToggle = () => {
    const toggledFlag: Voidable<Flag> = {...flag, isEnabled: !flag?.isEnabled};
    setFlag(toggledFlag);
  }

  const handleDescriptionChange = (value: string) => {
    setFlag({...flag, description: value});
  }

  const handleServeValueChange = (value: string) => {
    setFlag({...flag, defaultServeValue: {state: (value === 'True')}})
  }

  const handleSaveChanges = async () => {
    const updatedFlag = await flagContext.update(flag);
    if (updatedFlag) setFlag(updatedFlag);
    navigate(FlagListRoute);
  }

  return (
    <>
      {renderFlagHeader()}
      {renderFlagValue()}
      <div className="pt-5 text-end">
        <div className="btn btn-primary" onClick={handleSaveChanges}>
          <i className="mdi mdi-content-save me-2"></i>
          Save & Close
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