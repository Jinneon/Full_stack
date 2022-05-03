const Blog = require("../models/blog")
const User = require("../models/user")
const defaultBlogs = [

  {
    _id: "6270fa7b7b0340a5d1ad8442",
    title: "Jinneon is fishing pro",
    author: "Jinneon",
    url: "http://www.google.com",
    likes: 5,
    __v: 0
  },
  {
    _id: "6270fa7b7b0340a5d1ad8411",
    title: "Fishing season cancelled",
    author: "Jinneon",
    url: "http://www.google.com",
    likes: 5,
    __v: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { defaultBlogs, blogsInDb, usersInDb } 