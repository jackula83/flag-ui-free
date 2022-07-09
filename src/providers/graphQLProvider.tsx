import React, { createContext } from 'react';
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import * as Config from '../config.json';

interface IGraphQLContext {
  client: ApolloClient<NormalizedCacheObject>
}

export const GraphQLContext = createContext<IGraphQLContext>({} as IGraphQLContext);

export const GraphQLProvider: React.FC = (props: any) => {

  const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  const config = isDevelopment ? Config.development : Config.production;

  const client = new ApolloClient({
    uri: config.bff_endpoint,
    cache: new InMemoryCache(),
  });

  const value: IGraphQLContext = { client };

  return (
    <GraphQLContext.Provider value={value}>{props.children}</GraphQLContext.Provider>
  )
}

export default GraphQLProvider