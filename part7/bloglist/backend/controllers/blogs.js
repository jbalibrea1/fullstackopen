const Blog = require('../models/blog')
const blogRouter = require('express').Router()
const User = require('../models/user')
const userExtractor = require('../utils/userExtractor')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const userId = request.userId
  const user = await User.findById(userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
    comments: body.comments,
  })
  console.log(blog)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const userId = request.userId
  const user = await User.findById(userId)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response
      .status(401)
      .json({ error: 'Unauthorized to delete this blog' })
  }
})
blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
  }

  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    })
    response.json(updated)
  } catch {
    return response
      .status(401)
      .json({ error: 'Unauthorized to edit this blog' })
  }
})

blogRouter.post('/:id/comments', async (request, response) => {
  const blogId = request.params.id
  const { comment } = request.body

  const requestBlog = await Blog.findById(blogId)

  requestBlog.comments = requestBlog.comments.concat(comment)
  const savedComment = await requestBlog.save()
  response.status(201).json(savedComment)
})

module.exports = blogRouter
