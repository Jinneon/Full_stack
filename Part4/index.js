require("dotenv").config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (req, resp) => {
  Blog
    .find({})
    .then(blogs => {
      resp.json(blogs)
    })
})


app.post('/api/blogs', (req, resp) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      resp.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 