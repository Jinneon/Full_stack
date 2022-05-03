const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require("../models/user")
const jwt = require("jsonwebtoken")




blogsRouter.get("/", async (req, resp) => {
  const blogs = await Blog
  .find({})
  .populate("user", { username: 1, name: 1, id: 1 })
  resp.json(blogs)
})



const getTokenFrom = request => {
    const authorization = request.get('authorization') 
     if (authorization && authorization.toLowerCase().startsWith('bearer ')) 
     {    return authorization.substring(7)  } 
      return null}

blogsRouter.post("/", async (req, resp) => {
  const body = req.body

  const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET) 
     if (!token || !decodedToken.id)
      {    return resp.status(401).json(
        { error: 'Token is missing or invalid' })  }
          const user = await User.findById(decodedToken.id)

  const nBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if ( !nBlog.title && !nBlog.url ) {
    resp
      .status(400)
      .end()
    return
  }

  if ( !nBlog.likes )
  { 
    nBlog.likes = 0
  }

  const blogSaved = await nBlog.save()
  user.blogs = user.blogs.concat(blogSaved._id)
  await user.save()

  resp
    .status(201)
    .json(blogSaved)
})

//4.13
blogsRouter.delete("/:id", async (req, resp) => {
  const id = req.params.id

  await Blog.findByIdAndRemove(id)
  resp.status(204)
    .end()
})



module.exports = blogsRouter