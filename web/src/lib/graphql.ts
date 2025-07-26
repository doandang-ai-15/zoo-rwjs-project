// web/src/lib/graphql.ts
import { GraphQLClient } from 'graphql-request'

const endpoint = `${(window as any).__REDWOOD__API_PROXY_PATH}/graphql`

export const client = new GraphQLClient(endpoint)
