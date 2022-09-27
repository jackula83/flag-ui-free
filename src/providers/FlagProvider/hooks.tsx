import { useContext } from 'react';
import { Flag } from '../../operations/flag';
import { FlagContext } from './provider';

export const useFlagList = (): Flag[] => {
  const flagContext = useContext(FlagContext);
  if (flagContext?.flags) return flagContext.flags;
  return [];
}

