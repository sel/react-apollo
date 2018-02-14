import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const namespaceListQuery = gql`
  query NamespaceListQuery {
    namespaces {
      id
      name
    }
  }
`

const NamespaceList = ({ data: { loading, error, namespaces } }) => {
  if (loading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return <ul>{namespaces.map(n => <li key={n.id}>{n.name}</li>)}</ul>
}

export default graphql(namespaceListQuery)(NamespaceList)
