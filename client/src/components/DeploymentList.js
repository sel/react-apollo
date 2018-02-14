import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const deploymentListQuery = gql`
  query DeploymentListQuery {
    deployments {
      id
      name
    }
  }
`

const DeploymentList = ({ data: { loading, error, deployments } }) => {
  if (loading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return <ul>{deployments.map(d => <li key={d.id}>{d.name}</li>)}</ul>
}

export default graphql(deploymentListQuery)(DeploymentList)
