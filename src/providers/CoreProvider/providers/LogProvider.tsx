import React from 'react';
import { Voidable } from '../../../core/core';
import { useAddLogMutation, createLogInput } from '../../../operations/log';

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

  const logMutation = useAddLogMutation();

  const convertToText = (error: any): string => {
      const errorMessage = typeof error === "string"
        ? error as string
        : JSON.stringify(error, null, config?.jsonIdentation ?? 2);
      return errorMessage;
  }

  const logToServer = (message: string) => {
    try {
      const logInput = {
        variables: {
          ...createLogInput(message, 'error')
        }
      };
      logMutation(logInput);
    } catch (logError) {
      console.error('error sending log to server')
    }
  }

  const error = (error: any, consoleOut: boolean = true): string => {
    const message = convertToText(error);
    if (consoleOut) console.error(message);
    logToServer(message);
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
  ): Promise<Voidable<T>> => tryWithLogging(() => Promise.resolve(func()), final);

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