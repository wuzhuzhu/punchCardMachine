import { ApolloClient, createNetworkInterface } from 'react-apollo'

const uri = __DEV__ ? 'http://localhost:3080/graphql' : 'http://120.131.9.146:3080/8B8kMWAunyMhxM9q9OhMVCJiXpxBIqpo'

console.log('__DEV__', __DEV__)

// By default, this client will send queries to the `/graphql` endpoint on the same host
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri
  })
})

console.log(apolloClient.mutate)

export default apolloClient
