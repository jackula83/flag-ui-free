import React from 'react';
import { GraphQLProvider } from './GraphQLProvider';
import { LogProvider } from './LogProvider';

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