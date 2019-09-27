const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolver');

const typeDefs = `
type Query {
  language: String
  getRandomStats(character: CharacterInput!, number: Int): [Stat]
}

type Character {
  name: String!
  realm: String!
  origin: String!
}

input CharacterInput {
  name: String!
  realm: String!
  origin: String!
}

type Stat {
  name: String!
  quantity: Float!
  highest: String
}
`
module.exports = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers,
  logger: { log: e => console.log(e) },
});