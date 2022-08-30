import { gql } from '@apollo/client'

const AUTHORS_DETAILS = gql`
  fragment AuthorsDetails on Book {
    title
    published
    genres
    id
    author {
      name
      id
      bookCount
      born
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...AuthorsDetails
    }
  }
  ${AUTHORS_DETAILS}
`
export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      genres: $genres
      published: $published
    ) {
      title
      published
      author {
        name
        id
        born
      }
      genres
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $SetBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $SetBornTo) {
      name
      id
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      favoriteGenre
      username
      id
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...AuthorsDetails
    }
  }

  ${AUTHORS_DETAILS}
`
