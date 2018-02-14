export const typeDefs = `
type Deployment {
   id: ID!                # "!" denotes a required field
   name: String
}
# This type specifies the entry points into our API. In this case
# there is only one - "deployments" - which returns a list of deployments.
type Query {
   deployments: [Deployment]    # "[]" means this is a list of channels
}
`
