import { useContext } from 'react';
import { FlagContext } from './provider';
import { Flag } from './types';

export const useFlagList = (): Flag[] => {
  const flagContext = useContext(FlagContext);
  if (flagContext?.flags) return flagContext.flags;
  return [];
}

