import React, { useContext, useEffect, useState } from 'react';
import { Voidable, Flag } from '@flagcar/types';
import { LogContext } from 'features/core/CoreProvider';
import { 
  createFlagHeaderInput, 
  ListFlags, 
  useAddFlagMutation,
  useToggleMutation 
} from './graphql';

type Props = {
  flags: Voidable<Flag[]>,
  toggle: (flagId: number) => Promise<Flag>,
  add: (name: string, description: string) => Promise<Voidable<Flag>>,
  update: (flag: Flag) => Promise<Flag>
}

export const FlagContext = React.createContext<Props>({} as Props);

export const Provider = ({children}: React.PropsWithChildren) => {

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

  const update = async (flag: Flag): Promise<Flag> => {
    const [updatedFlag, error] = await logContext.withLoggingAsync<Flag>(async () =>
      await updateAndReturnFlag(flag));
    if (error) return {} as Flag;
    return updatedFlag!;
  }

  const toggle = async (flagId: number): Promise<Flag> => {
    const [toggledFlag, error] = await logContext.withLoggingAsync<Flag>(async () => 
      await toggleAndReturnFlag(flagId));
    if (error) return {} as Flag;
    return updateAndReturnFlag(toggledFlag!);
  }

  const value: Props = {
    flags,
    toggle,
    add,
    update
  }

  return (
    <FlagContext.Provider value={value}>{children}</FlagContext.Provider>
  )
}

export default Provider