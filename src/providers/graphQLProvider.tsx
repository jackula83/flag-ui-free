import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import * as Config from '../config.json';

export const GraphQLProvider: React.FC<React.PropsWithChildren> = (props) => {

  const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  const config = isDevelopment ? Config.development : Config.production;

  const client = new ApolloClient({
    uri: config.bff_endpoint,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>{props.children}</ApolloProvider>
  )
}

export default GraphQLProvider