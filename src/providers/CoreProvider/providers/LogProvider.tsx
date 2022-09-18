import React from 'react';
import { Voidable } from '../../../core/core';

export type LogProviderContext = {
  error: (error: any, consoleOut?: boolean) => string,
  info: (message: string, consoleOut?: boolean) => void,
  tryWithLogging: <T>(func: () => T, final?: () => void) => Voidable<T>,
  tryWithLoggingAsync: <T>(func: () => Promise<Voidable<T>>, final?: () => void) => Promise<Voidable<T>>
}

export const LogContext = React.createContext<LogProviderContext>({} as LogProviderContext);

export type LogProviderConfig = {
  jsonIdentation: number
}

type Props = React.PropsWithChildren & {
  config?: LogProviderConfig
}

export const LogProvider: React.FC<Props> = ({
  children, 
  config
}) => {

  // const tryAsyncFunc = <T,>(func: ())

  const convertToText = (error: any): string => {    
      const errorMessage = typeof error === nameof<string>()
        ? error as string
        : JSON.stringify(error, null, config?.jsonIdentation ?? 2);
      return errorMessage;
  }

  // TBD log this to server
  const logToServer = (message: string) => {}

  const error = (error: any, consoleOut: boolean = true): string => {
    const message = convertToText(error);
    if (consoleOut) console.error(message);
    try {
      logToServer(message);
    } catch (logError) {

    }
    return message;
  }

  const info = (message: string, consoleOut: boolean = true): void => {
    if (consoleOut) console.log(message);
  }

  const tryWithLogging = <T,>(func: () => T, final?: () => void): Voidable<T> => {
    try {
      return func();
    } catch (e) {
      error(e);
    } finally {
      if (final) final();
    }
  }

  const tryWithLoggingAsync = async <T,>(
    func: () => Promise<Voidable<T>>, 
    final?: () => void
  ): Promise<Voidable<T>> => {
    try {
      return await func();
    } catch (e) {
      error(e);
    } finally {
      if (final) final();
    }
  }

  const value: LogProviderContext = {
    error,
    info,
    tryWithLogging,
    tryWithLoggingAsync
  }

  return (
    <LogContext.Provider value={value}>{children}</LogContext.Provider>
  )
}

export default LogProvider