var express = require('express');
var cors = require('cors');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Namespace {
    id: ID!
    name: String
  }
  type Deployment {
    id: ID!
    name: String
  }
  type Query {
    deployments: [Deployment]
    namespaces: [Namespace]
  }
`);

class Deployment {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Namespace {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

// The root provides a resolver function for each API endpoint
var root = {
  namespaces: () => {
    return [new Namespace(1, 'default'), new Namespace(2, 'kube-system')];
  },
  deployments: () => {
    return [
      new Deployment(1, 'nginx'),
      new Deployment(2, 'postgres'),
      new Deployment(3, 'redis')
    ];
  }
};

var app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
