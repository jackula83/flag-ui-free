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
  defaultServeValue?: DefaultServeValue;
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

export const ListFlags = () => {
  const { data } = useQuery<FlagListData>(LIST_FLAGS);
  // TBD error handling
  return data?.flags;
}

export const GetFlag = (id: number): Flag => {
  const { data } = useQuery<FlagData, FlagDataVars>(
    GET_FLAG,
    {variables: { id }}
  );
  // TBD error handling
  return data!.flag;
}