import { useQuery, useMutation, gql, FetchResult } from "@apollo/client";
import { CoreEntityFields } from './fragments/coreFragments';

export interface DefaultServeValue {
  state: boolean;
}

export interface Flag {
  id: number;
  name: string;
  description: string;
  alias: string;
  isEnabled: boolean;
  defaultServeValue?: DefaultServeValue;
}

export interface FlagIdVars {
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
`

export const ListFlags = () => {
  interface FlagListData { flags: Flag[] }
  const { data } = useQuery<FlagListData>(LIST_FLAGS);
  // TBD error handling
  return data?.flags;
}


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
`

export const GetFlag = (id: number): Flag => {
  interface FlagData { flag: Flag }
  const { data } = useQuery<FlagData, FlagIdVars>(
    GET_FLAG,
    {variables: { id }}
  );
  // TBD error handling
  return data!.flag;
}


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
`

export interface ToggleData { toggle: Flag }
export const ToggleFlag = () => {
  const [variables] = useMutation<ToggleData, FlagIdVars>(
    TOGGLE_FLAG
  );
  return variables;
}