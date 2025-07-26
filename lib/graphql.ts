declare global {
  interface Window {
    __REDWOOD__API_PROXY_PATH: string
  }
}

// web/src/lib/graphql.ts
import { GraphQLClient } from 'graphql-request'

const endpoint = `${window.__REDWOOD__API_PROXY_PATH}/graphql`

export const client = new GraphQLClient(endpoint)
