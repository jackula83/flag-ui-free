import React, { useContext, useEffect, useState } from 'react';
import { Voidable } from '../core/core';
import { createFlagHeaderInput, Flag, ListFlags, useToggleMutation } from '../operations/flag';
import { LogContext } from './CoreProvider/providers/LogProvider';
import { useAddFlagMutation } from './../operations/flag';

export type FlagContextProps = {
  flags: Voidable<Flag[]>,
  list: () => Flag[],
  toggle: (flagId: number) => Promise<Flag>,
  add: (name: string, description: string) => Promise<Voidable<Flag>>
}

export const FlagContext = React.createContext<FlagContextProps>({} as FlagContextProps);

export const FlagProvider: React.FC<React.PropsWithChildren> = ({children}) => {

  const initialFlags = ListFlags();
  const [flags, setFlags] = useState<Voidable<Flag[]>>(undefined);
  const toggleMutation = useToggleMutation();
  const addMutation = useAddFlagMutation();

  useEffect(() => {
    setFlags(initialFlags);
  }, [initialFlags])

  const logContext = useContext(LogContext);

  const replaceFlagInState = (flag: Flag): void => 
    setFlags([...flags!.filter(f => f.id !== flag.id), flag]);

  const toggleAndReturnFlag = async (flagId: number) => {
      const { data } = await toggleMutation({
        variables: {
          id: parseInt(flagId.toString())
        }
      }); 
      const { toggleFlag: toggledFlag } = data!;
      return toggledFlag;
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

  const list = (): Flag[] => {
    if (flags) return flags;
    return [];
  }

  const toggle = async (flagId: number): Promise<Flag> => {
    const [toggledFlag, error] = await logContext.tryWithLoggingAsync<Flag>(async () => 
      await toggleAndReturnFlag(flagId));
    if (error) return {} as Flag;
    replaceFlagInState(toggledFlag!);
    return toggledFlag!;
  }

  const add = async (name: string, description: string): Promise<Voidable<Flag>> => {
    const [addedFlag, error] = await logContext.tryWithLoggingAsync<Flag>(async () =>
      await addAndReturnFlag(name, description));
    if (error) return undefined;
    setFlags([...flags!, addedFlag!]);
    return addedFlag!;
  }

  const value: FlagContextProps = {
    flags,
    list,
    toggle,
    add
  }

  return (
    <FlagContext.Provider value={value}>{children}</FlagContext.Provider>
  )
}

export default FlagProvider