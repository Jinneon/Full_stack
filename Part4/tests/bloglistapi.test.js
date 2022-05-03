const { test} = require("@jest/globals")
const { log } = require("console")
const { expect } = require("@jest/globals")
const mongoose = require("mongoose")
const bloglistRouter = require("../controllers/blogs")
const helper = require("./help")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const { application } = require("express")

const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany()
  let bObj = new Blog(defaultBlogs[0])
  await bObj.save()
  bObj = new Blog(defaultBlogs[1])
  await bObj.save()
})




test("Succesfully returned blogs  from bloglist", async () => {
  const resp = await api.get("/api/blogs/")
  expect(resp.body).toHaveLength(defaultBlogs.length)
}, 100000)
//4.9
test("Blog obj is named with \"id\"", async () => {
  const resp = await api.get("/api/blogs")
  const blog = resp.body[0]

  expect(blog.id).toBeDefined()
})

//4.10
test("Create blog", async () => {
  const nBlog = {
    "title": "New blog",
    "author": "Jinneon",
    "url": "https://github.com/Jinneon/Full_stack",
    "likes": 77
  }

  await api
    .post("/api/blogs")
    .send(nBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const resp = await api.get("/api/blogs")
  expect(resp.body).toHaveLength(defaultBlogs.length + 1)
  const titles = resp.body.map(blog => blog.title)
  expect(titles).toContain("New blog")
}, 20000)


//4.13

describe("Delete blogs", () => {
  test("Delete one blog", async () => {
    const firstBlog = await helper.blogsInDb()
    const deleteThis = firstBlog[0]

    await api
      .delete(`/api/blogs/${deleteThis.id}`)
      .expect(204)

      const lastBlog = await helper.blogsInDb()
      expect(lastBlog).toHaveLength(firstBlog.length - 1)

      const titles = lastBlog.map(blog => blog.title)
      expect(titles).not.toContain(deleteThis.title)
  })

})
//4.15 
describe("Only one user in database", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("pass", 10)
    const user = new User({ 
      username: "Jinneon",
      name: "Jin",
      passwordHash
    })

    await user.save()
  })

  test("Create new username", async () => {
    const firstUser = await helper.usersInDb()

    const newUser = {
      username: "JinJin",
      name: "JinJin",
      password: "pass2" 
    }
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const lastUser = await helper.usersInDb()
    expect(lastUser).toHaveLength(firstUser.length + 1)
    const unames = lastUser.map(user => user.username)
    expect(unames).toContain(newUser.username)
  })

  test("Creating user fails with correct code if password or uname is missing", async () => {
    const firstUser = await helper.usersInDb()

    const newUser = {
      username: "Jinneon",
      name: "Jin",
      password: "pass",
    }
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain("Give unique username")

    const lastUser = await helper.usersInDb()
    expect(lastUser).toEqual(firstUser)
  })
})

afterAll(() => {
  mongoose.connection.close()
}) 