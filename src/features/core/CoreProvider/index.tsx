import React from 'react';
import { GraphQLProvider } from './GraphQLProvider';
import { LogProvider } from './LogProvider';

export { LogContext } from './LogProvider';

export const CoreProvider = ({children}: React.PropsWithChildren) => {
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