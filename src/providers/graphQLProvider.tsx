import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BffEndpoint } from '../config';

export const GraphQLProvider: React.FC<React.PropsWithChildren> = (props) => {
  const endpoint = BffEndpoint;

  const client = new ApolloClient({
    uri: endpoint,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>{props.children}</ApolloProvider>
  )
}

export default GraphQLProvider