import React, { useEffect, useState } from 'react';
import { Flag, ListFlags, ToggleData, ToggleFlag } from '../operations/flag';

export interface FlagContextProps {
  flags: Flag[],
  toggle: (flagId: number) => Promise<Flag>
}

export const FlagContext = React.createContext<FlagContextProps>({} as FlagContextProps);

export const FlagProvider: React.FC<React.PropsWithChildren> = ({children}) => {

  const [flags, setFlags] = useState<Flag[]>([]);
  const [errors, setErrors] = useState<string[]>([])
  const toggleMutation = ToggleFlag();

  useEffect(() => {
    const flagsResult = ListFlags();
    if (flagsResult) setFlags(flagsResult)
  }, []);

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
    toggle
  }

  return (
    <FlagContext.Provider value={value}>{children}</FlagContext.Provider>
  )
}

export default FlagProvider