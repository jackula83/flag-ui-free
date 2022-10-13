import { useContext, useEffect, useState } from "react";
import { Flag, Voidable } from '@flagcar/types';
import { FlagContext } from "features/flags/FlagProvider";
import { useNavigate, useParams } from "react-router-dom";
import { FlagListRoute } from "pages/routes";
import { Card } from "ui/Card";
import { Row } from "ui/Row";
import { Align } from "ui/enums/align";
import { TextArea } from "ui/TextArea";
import { Badge } from "ui/Badge";
import { Select, SelectOption } from "ui/Select";
import { Button } from "ui/Button";
import { Container } from "ui/Container";
import { TextStyle } from "ui/enums/textStyle";
import { Icon } from "ui/Icon";
import { IconStyle } from "ui/enums/icons";
import { BadgeType } from "ui/enums/badgeTypes";

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
            <Card.Title styling={TextStyle.Lowercase} value={flag.name} />
          </Row.Col>
          <Row.Col size={6} align={Align.Right}>
            {flag?.isEnabled 
              ? <Badge type={BadgeType.Success} onClick={handleToggle}>Toggled On</Badge>
              : <Badge type={BadgeType.Secondary} onClick={handleToggle}>Toggled Off</Badge>
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

  const renderFlagValue = () => {
    const options: SelectOption[] = [
      {value:true.toString(), label: "True"},
      {value:false.toString(), label: "False"},
      {value: "custom", label: "Custom", disabled: true}
    ];
    return (
      <Card>
        <Card.Body>
          <Row>
            <Card.Title styling={TextStyle.Capitalize} value="State Value" />
          </Row>
          <hr />
          <Row>
            <Row.Col size={2}>
              <Select
                options={options} 
                selectedValue={flag.defaultServeValue?.state.toString()}
                onSelect={handleServeValueChange}
              />
            </Row.Col>
          </Row>
        </Card.Body>
      </Card>
    )
  };

  const renderButtons = () => (
    <Container align={Align.Right}>
      <Container.VMargin />
      <Button onClick={handleSaveChanges}>
        <Icon icon={IconStyle.Save} />
        <Container.HMargin size={1} />
        Save & Close
      </Button>
      <Container.HMargin />
      <Button.Dark disabled={true}>
        <Icon icon={IconStyle.Archive} />
        <Container.HMargin size={1} />
        Archive Flag
      </Button.Dark>
    </Container>
  );

  const handleToggle = () => {
    const toggledFlag: Voidable<Flag> = {...flag, isEnabled: !!!flag?.isEnabled};
    setFlag(toggledFlag);
  }

  const handleDescriptionChange = (value: string) => {
    setFlag({...flag, description: value});
  }

  const handleServeValueChange = (value: string) => {
    setFlag({...flag, defaultServeValue: {state: (value === true.toString())}})
  }

  const handleSaveChanges = async () => {
    const updatedFlag = await flagContext.update(flag);
    if (updatedFlag) setFlag(updatedFlag);
    navigate(FlagListRoute);
  }

  return (
    <>
      <Row>
        <Row.Col>
          {renderFlagHeader()}
          {renderFlagValue()}
          {renderButtons()}
        </Row.Col>
      </Row>
    </>
  );
}

export default FlagEdit;