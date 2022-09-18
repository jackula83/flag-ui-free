import { Voidable } from "./core";

export type Lock = {
  lockValue: boolean
}

export const createLock = (): Lock => ({lockValue: false});

export const makeExclusiveRequest = async <T,>(
  request: () => Promise<T>,
  lock: Lock
): Promise<Voidable<T>> => {
  if (lock.lockValue) return undefined;
  try {
      lock.lockValue = true;
      return await request();
    }
    finally {
      lock.lockValue = false;
    }
  }