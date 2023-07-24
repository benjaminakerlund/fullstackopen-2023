const router = require('express').Router()
const jwt = require("jsonwebtoken")
const Blog = require('../models/blog')
const user = require("../models/user")

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = new Blog({
    title, author, url, 
    likes: likes ? likes : 0
  })

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  blog.user = user._id

  const createdBlog = await blog.save()

  user.blogs = user.blogs.concat(createdBlog._id)
  await user.save()

  response.status(201).json(createdBlog)
})

router.put('/:id', async (request, response) => {
    const { title, author, url, likes} = request.body // updated user to 5.9
  const blog = {
    title,
    author,
    url,
    likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,  blog, { new: true })

  response.json(updatedBlog)
})

router.delete('/:id', async (request, response) => { // heavily modified...
  try {
    const blog = await Blog.findById(request.params.id)
    await blog.deleteOne() //for some reason remove() is deprecated in mongoose newer versions
    
    response.status(204).end()
  } catch(error) {console.log(error)}

})

module.exports = router