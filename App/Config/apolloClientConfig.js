import { ApolloClient, createNetworkInterface } from 'react-apollo'

const uri = __DEV__ ? 'http://localhost:3080/graphql' : 'https://prod.pigeon.51ijk.com/8B8kMWAunyMhxM9q9OhMVCJiXpxBIqpo'

console.log('__DEV__', __DEV__)

// By default, this client will send queries to the `/graphql` endpoint on the same host
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri
  })
})

export default apolloClient
