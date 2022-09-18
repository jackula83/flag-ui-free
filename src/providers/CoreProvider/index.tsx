import React from 'react';
import { GraphQLProvider } from './providers/GraphQLProvider';
import LogProvider from './providers/LogProvider';

export const CoreProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <GraphQLProvider>
        <LogProvider>
          {children}
        </LogProvider>
      </GraphQLProvider>
    </>
  )
}

export default CoreProvider