import '../Config'
import React, { Component } from 'react'
// import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import RootContainer from './RootContainer'
import createStore from '../Redux'

import apolloClient from '../Config/apolloClientConfig'

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render () {
    return (
      <ApolloProvider store={store} client={apolloClient}>
        <RootContainer />
      </ApolloProvider>
    )
  }
}

export default App
