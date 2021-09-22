const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const returnedBlog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })
  response.json(returnedBlog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(request.user.id)

  const blog = new Blog({
    title: body.title,
    user: user._id,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  if (!blog.title | !blog.url) {
    response.status(400).end()
  } else {
    const addedBlog = await blog.save()

    user.blogs = user.blogs.concat(addedBlog._id)
    await user.save()

    response.status(201).json(addedBlog)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blogToUpdate = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1 })

  if (request.user.username.toString() === blogToUpdate.user.username) {
    const updatedBlog = {
      title: body.title,
      url: body.url,
      likes: body.likes
    }

    const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    response.json(returnedBlog)
  } else {
    return response.status(401).json({ error: 'Unauthorized' })
  }


})

blogsRouter.delete('/:id', async (request, response) => {
  const returnedBlog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1 })

  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else if (request.user.username.toString() === returnedBlog.user.username) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Unauthorized' })
  }

})

module.exports = blogsRouter