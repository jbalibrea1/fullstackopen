import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
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
      author
      genres
      published
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
