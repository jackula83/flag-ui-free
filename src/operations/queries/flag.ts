import { useQuery, gql } from "@apollo/client";
import { CoreEntityFields } from './../coreFragments';

export interface DefaultServeValue {
  state: boolean;
}

export interface Flag {
  name: string;
  description: string;
  alias: string;
  isEnabled: boolean;
  defaultServeValue: DefaultServeValue;
}

interface FlagListData {
  flags: Flag[]
}

interface FlagData {
  flag: Flag
}

interface FlagDataVars {
  id: number
}

const entityName = nameof<Flag>();

const FLAG_FIELDS = gql`
  ${CoreEntityFields(entityName)}
  fragment CoreFlagFields on ${entityName} {
    ...CoreEntityFields
    name
    description
    alias
    isEnabled
    defaultServeValue {
      state
    }
  }
`;

const LIST_FLAGS = gql`
  ${FLAG_FIELDS}
  query {
    flags {
      ...CoreFlagFields
    }
  }
`;

const GET_FLAG = gql`
  ${FLAG_FIELDS}
  query {
    flag(id: $id) {
      ...CoreFlagFields
    }
  }
`;

export const ListFlags = (): Flag[] => {
  const { data } = useQuery<FlagListData>(LIST_FLAGS);
  return data!.flags;
}

export const GetFlag = (id: number): Flag => {
  const { data } = useQuery<FlagData, FlagDataVars>(
    GET_FLAG,
    {variables: { id }}
  );
  return data!.flag;
}