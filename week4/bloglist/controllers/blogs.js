const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate(
      'user', {username: 1, name: 1}
    )
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if(blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch ( e ) {
    next(e)
  }
})

const getTokenFrom = request => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
    return authorization.substring(7)  
  }  
  return null
}

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log(request.token)
  try {    
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)    
    if (!token || !decodedToken.id) {      
      return response.status(401).json({ error: 'token missing or invalid' })    
    }
  
    const user = await User.findById(body.userId)
    const blog = new Blog({
      title: body.title,
      url: body.url,
      likes: body.likes,
      user: user._id
  })

  if(!(blog.likes)){blog.likes = 0}
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch( e ) {
    next(e)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try{
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)    
    if(!token || !decodedToken.id){
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch ( e ) {
    next(e)
  }
})
/*
blogsRouter.put('/:id', async (request, response, next) => {
  const blog = new Blog(request.body)

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params._id, blog, { new: true })
    console.log(blog)
    console.log(updatedBlog)
    response.json(updatedBlog.toJSON())
  } catch(e) {
    next(e)
  }
})
*/
module.exports = blogsRouter