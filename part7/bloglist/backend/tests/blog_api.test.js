const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeAll(async () => {
  await User.deleteMany({})
  const user = {
    'username' : 'test',
    'name' : 'test',
    'password' : 'test'
  }

  await api
    .post('/api/users')
    .send(user)
    .expect('Content-Type',/application\/json/)
})
beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let noteObject = new Blog(blog)
    await noteObject.save()
  }
})

describe('blog info', () => {
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
})
describe('Add a blog', () => {

  test('valid token user and add blog ', async () => {

    const user = {
      username: 'test',
      password: 'test',
    }

    const userLogged = await api
      .post('/api/login')
      .send(user)
      .expect('Content-Type',/application\/json/)


    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set('Authorization',`Bearer ${userLogged.body.token}`)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'React patterns'
    )
  })

  test('create blog without title or url, error400', async () => {
    const user = {
      username: 'test',
      password: 'test',
    }
    const userLogged = await api
      .post('/api/login')
      .send(user)
      .expect('Content-Type',/application\/json/)

    const newBlog = {
      author: 'Michael Chan',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization',`Bearer ${userLogged.body.token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('if likes property is missing, likes 0', async () => {
    const user = {
      username: 'test',
      password: 'test',
    }
    const userLogged = await api
      .post('/api/login')
      .send(user)
      .expect('Content-Type',/application\/json/)

    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization',`Bearer ${userLogged.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = await blogsAtEnd.find(blog => blog.title === 'React patterns')
    expect(addedBlog.likes).toBe(0)
  })
})
describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const user = {
      username: 'test',
      password: 'test',
    }

    const userLogged = await api
      .post('/api/login')
      .send(user)
      .expect('Content-Type',/application\/json/)

    const newBlog = {
      title:'test',
      author:'test',
      url:'www.test.com',
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set('Authorization',`Bearer ${userLogged.body.token}`)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length -1]


    await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization',`Bearer ${userLogged.body.token}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const contents = blogsAtEnd.map((r) => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})
describe('updated blog',() => {
  test('updated likes from some blog with token', async () => {
    const user = {
      username: 'test',
      password: 'test',
    }

    const userLogged = await api
      .post('/api/login')
      .send(user)
      .expect('Content-Type',/application\/json/)

    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set('Authorization',`Bearer ${userLogged.body.token}`)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    const testBlog = blogsInDb[blogsInDb.length-1]
    console.log(testBlog)
    console.log('testblog',testBlog)
    const defaultLikes = testBlog.likes
    testBlog.likes = defaultLikes + 13

    await api.put(`/api/blogs/${testBlog.id}`).send(testBlog).set('Authorization',`Bearer ${userLogged.body.token}`).expect(200)

    const updateBlogsInDb = await helper.blogsInDb()
    const someBlogUpdated = updateBlogsInDb[blogsInDb.length-1]

    expect(someBlogUpdated.likes).toBe(defaultLikes + 13)
  })
})
describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
