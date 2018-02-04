import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://127.0.0.1:4000/graphql' }),
  cache: new InMemoryCache()
});

const deploymentListQuery = gql`
  query DeploymentListQuery {
    deployments {
      id
      name
    }
  }
`;

const DeploymentList = ({ data: { loading, error, deployments } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <ul>{deployments.map(d => <li key={d.id}>{d.name}</li>)}</ul>;
};

const DeploymentListWithData = graphql(deploymentListQuery)(DeploymentList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Kubernetes Deployments</h1>
          </header>
          <DeploymentListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
