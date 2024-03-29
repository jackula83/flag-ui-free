import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BffEndpoint } from 'features/config';

export const Provider = (props: React.PropsWithChildren) => {
  const endpoint = BffEndpoint;

  const client = new ApolloClient({
    uri: endpoint,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>{props.children}</ApolloProvider>
  )
}

export default Provider