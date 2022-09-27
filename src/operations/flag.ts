import { useQuery, useMutation, gql, FetchResult } from "@apollo/client";
import { CoreEntityFields } from './fragments/coreFragments';

export interface DefaultServeValue {
  state: boolean;
}

export interface Flag {
  id: number;
  uuid: string;
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
  ${ENTITY_FIELDS}
  query Flags {
    flags {
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

type FlagListData = { flags: Flag[] }
export const ListFlags = (): Flag[] => {
  const { data } = useQuery<FlagListData>(LIST_FLAGS);
  return data?.flags!;
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
  return data!.flag;
}


const TOGGLE_FLAG = gql`
  ${ENTITY_FIELDS}
  mutation ToggleFlag($id: Int!) {
    toggleFlag(id: $id) {
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

// export type MutationOptions<T> = (options?: any) => Promise<FetchResult<T>>
export interface ToggleData { toggleFlag: Flag }
export const useToggleMutation = () => {
  const [variables] = useMutation<ToggleData, FlagIdVars>(
    TOGGLE_FLAG
  );
  return variables;
}

const ADD_FLAG = gql`
  mutation AddFlag($flagHeader: FlagHeaderInput!) {
    addFlag(flagHeader: $flagHeader) {
      id,
      uuid,
      name,
      description,
      alias,
      isEnabled,
      defaultServeValue {
        state
      }
    }
  }
`

type FlagHeaderInput = {
  flagHeader: {
    name: string,
    description: string
  }
}
export interface AddFlagData { addFlag: Flag }
export const createFlagHeaderInput = (name: string, description: string): FlagHeaderInput => {
  return {
    flagHeader: {
      name,
      description
    }
  };
}
export const useAddFlagMutation = () => {
  const [addFlagMutation] = useMutation<AddFlagData, FlagHeaderInput>(ADD_FLAG);
  return addFlagMutation;
}