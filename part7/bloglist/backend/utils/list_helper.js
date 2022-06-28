var _ = require('lodash')
const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (likes) => {
  const individualLikes = likes.map((x) => x.likes)
  const totalLikes = individualLikes.reduce((x, y) => x + y, 0)
  return totalLikes
}

const favoriteBlog = (blog) => {
  const likes = blog.map((x) => x.likes)
  const max = Math.max(...likes)
  let obj = {}
  for (let i = 0; i < blog.length; i++) {
    if (blog[i].likes === max) {
      obj = {
        title: blog[i].title,
        author: blog[i].author,
        likes: blog[i].likes,
      }
      return obj
    }
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const authors = _.countBy(blogs, 'author')
  console.log(authors)
  let author = ''
  let max = 0

  for (const prop in authors) {
    console.log('prop', prop, 'authorprop', authors[prop])
    if (authors[prop] > max) {
      max = authors[prop]
      author = prop
    }
  }

  return {
    author: author,
    blogs: max,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
