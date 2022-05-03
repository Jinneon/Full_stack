const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (req, resp) => {
  //was before 4.17
 // const users = await User.find({})
 const users = await User
    .find({})
    .populate("blogs", { title: 1, author: 1, url: 1, id: 1 })
  resp.json(users)
})

usersRouter.post("/", async (req, resp) => {
  const { username, name, password } = req.body

  const uNotAvailable = await User.findOne({ username })
  if (uNotAvailable) {
    return resp
      .status(400)
      .json({ error: "Give unique username" })
  }

  const yo = 10
  const hashedPassword = await bcrypt.hash(password, yo)

  const user = new User({
    username,
    name,
    hashedPassword,
  })

  const saveUser = await user.save()

  resp
    .status(201)
    .json(saveUser)
})

module.exports = usersRouter