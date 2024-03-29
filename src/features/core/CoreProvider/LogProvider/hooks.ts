import { useContext } from 'react';
import { Voidable } from '@flagcar/types';
import { LogContext } from "./provider";

export const useLoggingCallback = <T,>(): ((
    func: () => T, 
    final?: () => void
  ) => [
    Voidable<T>, 
    string
  ]
) => useContext(LogContext).withLogging;

export const useLoggingCallbackAsync = <T,>(): ((
    func: () => Promise<Voidable<T>>, 
    final?: () => void
  ) => Promise<[
    Voidable<T>, 
    string
  ]>
) => useContext(LogContext).withLoggingAsync;
