
export type Lock = {
  lockValue: boolean
}

export const createLock = (): Lock => ({lockValue: false});

export const makeExclusiveRequest = async <T,>(
  request: () => Promise<T>,
  lock: Lock
): Promise<[T?, any?]> => {
  if (lock.lockValue) return [];
  lock.lockValue = true;
    try {
      return [await request()];
    } catch (error) {
      return [undefined, error];
    }
    finally {
      lock.lockValue = false;
    }
  }