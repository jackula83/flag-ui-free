import { useParams } from "react-router-dom";

const FlagEdit = () => {

  const { flagUuid } = useParams<string>();

  return (
    <h1>Hello World, flag ID is: {flagUuid}</h1>
  );
}

export default FlagEdit;