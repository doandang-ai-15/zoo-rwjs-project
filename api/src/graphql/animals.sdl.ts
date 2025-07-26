export const schema = gql`
  type Animal {
    id: Int!
    name: String!
    zooId: Int!
    zoo: Zoo!
  }

  type Query {
    animals: [Animal!]! @requireAuth
    animal(id: Int!): Animal @requireAuth
  }

  input CreateAnimalInput {
    name: String!
    zooId: Int!
  }

  input UpdateAnimalInput {
    name: String
    zooId: Int
  }

  type Mutation {
    createAnimal(input: CreateAnimalInput!): Animal! @requireAuth
    updateAnimal(id: Int!, input: UpdateAnimalInput!): Animal! @requireAuth
    deleteAnimal(id: Int!): Animal! @requireAuth
  }
`
