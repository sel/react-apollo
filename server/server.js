var express = require('express');
var cors = require('cors');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Deployment {
    id: ID!
    name: String
  }
  type Query {
    deployments: [Deployment]
  }
`);

class Deployment {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

// The root provides a resolver function for each API endpoint
var root = {
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
