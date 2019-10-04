const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolver');

const typeDefs = `
type Query {
  getRandomStats(character: CharacterInput!, number: Int): [Stat],
  tops: [Top]
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

type Top {
  stat: Stat!
  character: Character!
}

type Stat {
  name: String!
  quantity: Float!
  highest: String
  isTop: Boolean!
}
`
module.exports = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers,
  logger: { log: e => console.log(e) },
});