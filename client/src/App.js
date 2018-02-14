import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import NamespaceListWithData from './components/NamespaceList'
import DeploymentListWithData from './components/DeploymentList'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://127.0.0.1:4000/graphql' }),
  cache: new InMemoryCache()
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Kubernetes Resources</h1>
          </header>
          <h2>Namespaces</h2>
          <NamespaceListWithData />
          <h2>Deployments</h2>
          <DeploymentListWithData />
        </div>
      </ApolloProvider>
    )
  }
}

export default App
