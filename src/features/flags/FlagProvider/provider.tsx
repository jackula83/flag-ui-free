import React, { useContext, useEffect, useState } from 'react';
import { Voidable } from 'features/core/core';
import { 
  createFlagHeaderInput, 
  Flag, 
  ListFlags, 
  useAddFlagMutation,
  useToggleMutation 
} from './/graphql';
import { LogContext } from 'features/core/CoreProvider/LogProvider';

type FlagContextProps = {
  flags: Voidable<Flag[]>,
  toggle: (flagId: number) => Promise<Flag>,
  add: (name: string, description: string) => Promise<Voidable<Flag>>
}

export const FlagContext = React.createContext<FlagContextProps>({} as FlagContextProps);

export const Provider: React.FC<React.PropsWithChildren> = ({children}) => {

  const initialFlags = ListFlags();
  const [flags, setFlags] = useState<Voidable<Flag[]>>(undefined);
  const toggleMutation = useToggleMutation();
  const addMutation = useAddFlagMutation();

  useEffect(() => {
    setFlags(initialFlags);
  }, [initialFlags])

  const logContext = useContext(LogContext);

  const toggleAndReturnFlag = async (flagId: number) => {
      const { data } = await toggleMutation({
        variables: {
          id: parseInt(flagId.toString())
        }
      }); 
      const { toggleFlag: toggledFlag } = data!;
      return toggledFlag;
  }

  const updateAndReturnFlag = (flag: Flag): Flag => {
    const matchingFlag = flags?.find(f => f.id === flag.id);
    if (matchingFlag) setFlags([...flags!.filter(f => f.id !== flag.id), flag]);
    else setFlags([...flags!, flag]);
    return flag;
  }

  const addAndReturnFlag = async (name: string, description: string) => {
    const { data } = await addMutation({
      variables: {
        ...createFlagHeaderInput(name, description)
      }
    });
    const { addFlag: addFlagData } = data!;
    return addFlagData;
  }

  const add = async (name: string, description: string): Promise<Voidable<Flag>> => {
    const [addedFlag, error] = await logContext.withLoggingAsync<Flag>(async () =>
      await addAndReturnFlag(name, description));
    if (error) return undefined;
    return updateAndReturnFlag(addedFlag!);
  }

  const toggle = async (flagId: number): Promise<Flag> => {
    const [toggledFlag, error] = await logContext.withLoggingAsync<Flag>(async () => 
      await toggleAndReturnFlag(flagId));
    if (error) return {} as Flag;
    return updateAndReturnFlag(toggledFlag!);
  }

  const value: FlagContextProps = {
    flags,
    toggle,
    add
  }

  return (
    <FlagContext.Provider value={value}>{children}</FlagContext.Provider>
  )
}

export default Provider