import { ApolloClient, createHttpLink, InMemoryCache, from } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

// HTTP connection to the GraphQL API
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
})

// Auth middleware — attaches the JWT token stored in localStorage to every request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('biomarina_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// Cache implementation
const cache = new InMemoryCache()

// Apollo client with auth middleware chained
export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
    query:      { fetchPolicy: 'network-only', errorPolicy: 'all' },
  },
})
