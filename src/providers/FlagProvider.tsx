import React, { useEffect, useState } from 'react';
import { Flag, ListFlags, ToggleData, ToggleFlag } from '../operations/flag';

export interface FlagContextProps {
  flags: Flag[],
  list: () => Flag[],
  toggle: (flagId: number) => Promise<Flag>,
  atomicRequest: <T,>(request: () => T) => T | undefined
}

export const FlagContext = React.createContext<FlagContextProps>({} as FlagContextProps);

export const FlagProvider: React.FC<React.PropsWithChildren> = ({children}) => {

  const [flags, setFlags] = useState<Flag[]>([]);
  const [errors, setErrors] = useState<string[]>([])
  const [requestLock, setRequestLock] = useState<boolean>(false);
  const toggleMutation = ToggleFlag();
  const flagsResult = ListFlags();

  useEffect(() => {
    if (flagsResult) setFlags(flagsResult)
  }, [flagsResult]);

  const replaceFlagInState = (flag: Flag): void => 
    setFlags([...flags.filter(f => f.id !== flag.id), flag]);

  const getFlagAfterToggleMutation = async (flagId: number) => {
      const { data } = await toggleMutation({
        variables: {
          id: parseInt(flagId.toString())
        }
      }); 
      const { toggle: toggledFlag } = data!;
      return toggledFlag;
  }

  const addErrorToState = (error: any) => {
      const errorMessage = typeof error === nameof<string>()
        ? error as string
        : JSON.stringify(error, null, 2);
      setErrors([...errors, errorMessage]);
  }

  const atomicRequest = <T,>(request: () => T): T | undefined => {
    if (requestLock) return undefined;
    setRequestLock(true);
    try {
      return request();
    } catch (error) {
      addErrorToState(error);
    }
    finally {
      setRequestLock(false);
    }
  }

  const list = (): Flag[] => {
    try {
      return ListFlags()!;
    } catch (error) {
      addErrorToState(error);
    }
    return [];
  }

  const toggle = async (flagId: number): Promise<Flag> => {
    try {
      const toggledFlag = await getFlagAfterToggleMutation(flagId);
      replaceFlagInState(toggledFlag);
      return toggledFlag;
    } catch (error) {
      addErrorToState(error);
    }
    return {} as Flag;
  }

  const value: FlagContextProps = {
    flags,
    list,
    toggle,
    atomicRequest
  }

  return (
    <FlagContext.Provider value={value}>{children}</FlagContext.Provider>
  )
}

export default FlagProvider