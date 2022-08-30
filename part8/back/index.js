const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const mongoose = require('mongoose')
require('dotenv').config()

const jwt = require('jsonwebtoken')

const User = require('./models/user')
const resolvers = require('./resolvers')
const typeDefs = require('./schema')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET
console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



const schema = makeExecutableSchema({ typeDefs, resolvers })
const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
