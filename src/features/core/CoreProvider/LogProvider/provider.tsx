import React from 'react';
import { Voidable } from '@flagcar/types';
import { isDevelopment, isFree } from 'features/config';
import { useAddLogMutation, createLogInput } from './graphql';

export type LogProviderContext = {
  error: (error: any, consoleOut?: boolean) => string,
  info: (message: string, consoleOut?: boolean) => void,
  withLogging: <T>(func: () => T, final?: () => void) => [
    Voidable<T>, 
    string
  ],
  withLoggingAsync: <T>(func: () => Promise<Voidable<T>>, final?: () => void) => Promise<[
    Voidable<T>, string
  ]>
}

export const LogContext = React.createContext<LogProviderContext>({} as LogProviderContext);

export type LogProviderConfig = {
  jsonIdentation: number
}

type Props = React.PropsWithChildren & {
  config?: LogProviderConfig
}

export const Provider = ({
  children, 
  config
}: Props) => {

  const defaultConsoleOut = isDevelopment() || isFree();

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

  const error = (error: any, consoleOut: boolean = defaultConsoleOut): string => {
    const message = convertToText(error);
    if (consoleOut) console.error(message);
    logToServer(message);
    return message;
  }

  const info = (message: string, consoleOut: boolean = true): void => {
    if (consoleOut) console.log(message);
  }

  const withLogging = <T,>(func: () => T, final?: () => void): [Voidable<T>, string] => {
  try {
    return [func(), ''];
  } catch (e) {
    return [{} as T, error(e)];
  } finally {
    if (final) final();
  }
}

const withLoggingAsync = async <T,>(
    func: () => Promise<Voidable<T>>, 
    final?: () => void
  ): Promise<[Voidable<T>, string]> => {
  try {
    return [await func(), ''];
  } catch (e) {
    return [undefined, error(e)];
  } finally {
    if (final) final();
  }
}

  const value: LogProviderContext = {
    error,
    info,
    withLogging,
    withLoggingAsync
  }

  return (
    <LogContext.Provider value={value}>{children}</LogContext.Provider>
  )
}

export default Provider