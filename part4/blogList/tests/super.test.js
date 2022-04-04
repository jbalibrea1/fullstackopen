const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let noteObject = new Blog(blog)
    await noteObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier _', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0]._id).toBeUndefined()
  expect(response.body[0].id).toBeDefined()
})

test('Blog add +1', async () => {
  const newBlog = {
    title: 'new test added',
    author: 'Jaime',
    url: 'www.facebook.com',
    likes: 18000,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const contents = blogsAtEnd.map((n) => n.title)
  expect(contents).toContain('new test added')
})

test('if likes property is missing, likes = 0', async () => {
  const newBlog = {
    title: 'new test added',
    author: 'Jaime',
    url: 'www.facebook.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  let lastElement = blogsAtEnd.pop()
  expect(lastElement.likes).toBe(0)
})

test('create blog without title or url, error400', async () => {
  const newBlog = {
    author: 'Jaime',
    likes: 7,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map((r) => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('updated blog', () => {
  test('updated likes from some blog', async () => {
    const blogsInDb = await helper.blogsInDb()
    const testBlog = blogsInDb[0]
    const defaultLikes = testBlog.likes
    testBlog.likes = defaultLikes + 13

    await api.put(`/api/blogs/${testBlog.id}`).send(testBlog).expect(200)

    const updateBlogsInDb = await helper.blogsInDb()
    const someBlogUpdated = updateBlogsInDb[0]

    expect(someBlogUpdated.likes).toBe(defaultLikes + 13)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
