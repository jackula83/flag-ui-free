import { useMutation, gql } from "@apollo/client";
import { Log } from "./types";

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
    addLog(input: $input) {
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

export const useAddLogMutation = () => {
  const [addLogMutation] = useMutation<Log, LogInput>(ADD_LOG);
  return addLogMutation;
}