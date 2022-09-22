import React, { useContext, useEffect, useState } from 'react';
import { Voidable } from '../core/core';
import { Flag, ListFlags, useToggleMutation } from '../operations/flag';
import { LogContext } from './CoreProvider/providers/LogProvider';

export type FlagContextProps = {
  flags: Flag[],
  list: () => Flag[],
  toggle: (flagId: number) => Promise<Flag>
}

export const FlagContext = React.createContext<FlagContextProps>({} as FlagContextProps);

export const FlagProvider: React.FC<React.PropsWithChildren> = ({children}) => {

  const [flags, setFlags] = useState<Flag[]>([]);
  const toggleMutation = useToggleMutation();

  const logContext = useContext(LogContext);

  const replaceFlagInState = (flag: Flag): void => 
    setFlags([...flags.filter(f => f.id !== flag.id), flag]);

  const toggleAndReturnFlag = async (flagId: number) => {
      const { data } = await toggleMutation({
        variables: {
          id: parseInt(flagId.toString())
        }
      }); 
      const { toggleFlag: toggledFlag } = data!;
      return toggledFlag;
  }

  const list = (): Flag[] => {
    const result = logContext.tryWithLogging<Flag[]>(() => ListFlags());
    if (result) return result;
    return [];
  }

  const toggle = async (flagId: number): Promise<Flag> => {
    const toggledFlag = await logContext.tryWithLoggingAsync<Flag>(async () => 
      await toggleAndReturnFlag(flagId));
    if (toggledFlag) {
      replaceFlagInState(toggledFlag);
      return toggledFlag;
    }
    return {} as Flag;
  }

  const value: FlagContextProps = {
    flags,
    list,
    toggle
  }

  return (
    <FlagContext.Provider value={value}>{children}</FlagContext.Provider>
  )
}

export default FlagProvider