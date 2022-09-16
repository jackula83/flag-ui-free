import { useQuery, useMutation, gql } from "@apollo/client";
import { CoreEntityFields } from './fragments/coreFragments';

export interface DefaultServeValue {
  state: boolean;
}

export interface Flag {
  name: string;
  description: string;
  alias: string;
  isEnabled: boolean;
  defaultServeValue?: DefaultServeValue;
}

interface FlagListData {
  flags: Flag[]
}

interface FlagData {
  flag: Flag
}

interface FlagIdVars {
  id: number
}

const entityName = "Flag";

const ENTITY_FIELDS = CoreEntityFields(entityName);

const LIST_FLAGS = gql`
  query {
    flags {
      id,
      name,
      alias,
      isEnabled
    }
  }
`;

const GET_FLAG = gql`
  ${ENTITY_FIELDS}
  query Flag {
    flag(id: $id) {
      ...CoreEntityFields
      name
      description
      alias
      isEnabled
      defaultServeValue {
        state
      }
    }
  }
`;


const TOGGLE_FLAG = gql`
  ${ENTITY_FIELDS}
  mutation Toggle {
    toggle(id: $id) {
      ...CoreEntityFields
      name
      description
      alias
      isEnabled
      defaultServeValue {
        state
      }
    }
  }
`;

export const ListFlags = () => {
  const { data } = useQuery<FlagListData>(LIST_FLAGS);
  // TBD error handling
  return data?.flags;
}

export const GetFlag = (id: number): Flag => {
  const { data } = useQuery<FlagData, FlagIdVars>(
    GET_FLAG,
    {variables: { id }}
  );
  // TBD error handling
  return data!.flag;
}

export const ToggleFlag = (id: number): Flag => {
  const [_, { data }] = useMutation<FlagData, FlagIdVars>(
    TOGGLE_FLAG,
    {variables: { id }}
  );
  return data!.flag;
}