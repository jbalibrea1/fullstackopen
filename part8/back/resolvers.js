const { UserInputError, AuthenticationError } = require('apollo-server')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
  Query: {
    me: async (root, args, { currentUser }) => {
      return currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        const books = await Book.find({ genres: { $in: args.genre } }).populate(
          'author'
        )
        return books
      }
      return await Book.find({}).populate('author')
    },
    allAuthors: async () => {
      return await Author.find({})
    },
  },
  Author: {
    bookCount: async (root) => {
      const book = await Book.find()
      const bookFilter = book.filter((b) => b.author == root.id)
      return await bookFilter.length
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const checkAuthor = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author: checkAuthor })
      console.log(book)
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

module.exports = resolvers