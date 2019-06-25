const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title:'tTitle',
        author: 'tAuthor',
        url: 'tUrl',
        likes: 0,
        userId: "5cfd61844e8b621fe5c36fc6"
      },
      {
        title:'tTitle2',
        author: 'tAuthor2',
        url: 'tUrl2',
        likes: 2,
        userId: "5cfd61844e8b621fe5c36fc6"
      }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}