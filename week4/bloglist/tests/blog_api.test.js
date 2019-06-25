const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.remove({})

  const blogObject = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  console.log('entered test')
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'tTitle'  
    )
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title:'ntTitle',
    author: 'ntAuthor',
    url: 'ntUrl',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()  
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.map(n => n.title)  
    expect(contents).toContain(
      'ntTitle'
    )
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'ntAuthor2',
    url: 'ntUrl2',
    likes: 6
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api    
  .get(`/api/blogs/${blogToView.id}`)    
  .expect(200)    
  .expect('Content-Type', /application\/json/)
  expect(resultBlog.body.title).toEqual(blogToView.title)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api    
  .delete(`/api/blogs/${blogToDelete.id}`)    
  .expect(204)
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(
    helper.initialBlogs.length - 1
  )

  const contents = blogsAtEnd.map(r => r.title)

  expect(contents).not.toContain(blogToDelete.title)
})

test('identifier is "id"', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]
  expect(blogToView.id).toBeDefined()
})

test('undef likes results in val of zero', async () => {
  const newBlog = {
    title:'ntTitle3',
    author: 'ntAuthor3',
    url: 'ntUrl3'
  }
   
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  
  const blogsAtEnd = await helper.blogsInDb()
  const contents = blogsAtEnd.map(r => r.likes)

  expect(contents[contents.length - 1]).toEqual(0)
})

/*test('a blog like count can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatedBlog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 1
  }

  await api
  .put(blogToUpdate.id ,'/api/blogs')
  .send(updatedBlog)
  .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlogAtEnd = blogsAtEnd[0]

  expect(updatedBlogAtEnd.likes).toBe(1)
})*/

afterAll(() => {
  console.log('closing connection')
  mongoose.connection.close()
})