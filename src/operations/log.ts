import { useQuery, useMutation, gql, FetchResult } from "@apollo/client";
import { CoreEntityFields } from './fragments/coreFragments';

export interface DefaultServeValue {
  state: boolean;
}

export type Log = {
  id: number,
  message: string,
  type: string,
  source: string
}

export const TypeInfo = 'info'
export const TypeWarning = 'warning'
export const TypeError = 'error'

const DefaultSource = 'flag-ui'

type LogInput = {
  input: {
    message: string,
    type: string,
    source: string
  }
}

const ADD_LOG = gql`
  mutation AddLog($input: LogInput!) {
    toggle(input: $input) {
      message
    }
  }
`

export const createLogInput = (message: string, type: string): LogInput => {
  return {
    input: {
      message,
      type,
      source: DefaultSource
    }
  };
}

export const AddLog = () => {
  const [variables] = useMutation<Log, LogInput>(ADD_LOG);
  return variables;
}