export const schema = gql`
  type Zoo {
    id: Int!
    name: String!
    animals: [Animal]!
  }

  type Query {
    zoos: [Zoo!]! @requireAuth
    zoo(id: Int!): Zoo @requireAuth
  }

  input CreateZooInput {
    name: String!
  }

  input UpdateZooInput {
    name: String
  }

  type Mutation {
    createZoo(input: CreateZooInput!): Zoo! @requireAuth
    updateZoo(id: Int!, input: UpdateZooInput!): Zoo! @requireAuth
    deleteZoo(id: Int!): Zoo! @requireAuth
  }
`
