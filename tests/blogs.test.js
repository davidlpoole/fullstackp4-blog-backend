const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./blogTestHelper')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})


describe('GET', () => {
  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })


  test('blogs have an id', async () => {
    const response = await api
      .get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })


  test('can get a blog by its id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToCheckFor = blogsAtStart[0]

    const response = await api
      .get(`/api/blogs/${blogToCheckFor.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.id).toEqual(blogToCheckFor.id)
  })

  test('blogs have an id', async () => {
    const response = await api
      .get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

})

describe('POST', () => {
  test('blogs can be added', async () => {

    const newBlog = {
      title: 'Something new',
      author: 'Me',
      url: 'http://www.google.com',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  })



  test('if likes property is missing then equals zero', async () => {

    const newBlog = {
      title: 'Something new',
      author: 'Me',
      url: 'http://www.google.com'
    }

    const addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const processedBlogToCheck = JSON.parse(JSON.stringify(addedBlog.body))
    expect(processedBlogToCheck.likes).toEqual(0)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  })



  test('if title and url are missing, get status 400 bad request', async () => {

    const newBlog = {
      url: 'http://www.google.com',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })
})

describe('DELETE', () => {
  test('blogs can be deleted', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

})

afterAll(async () => {
  mongoose.connection.close()
})