import { useState, useEffect, useRef } from "react"
//import Blog from "./components/Blog"
import blogService from "./services/blogs"

import Popup from "./components/Popup"

import "./index.css"
import loginService from "./services/loginService"
import AddBlog from "./components/AddBlog"
import Switch from "./components/Switch"
import Bloglist from "./components/Bloglist"


// npm run eslint -- --fix
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  
  const [message, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const localuser = window.localStorage.getItem("userCreated")
    
    if (localuser) {
      const user = JSON.parse(localuser)

      setUser(user)
      blogService.setToken(user.token)
    }

    console.log(window.localuser)
  }, [])

  const navi = (note, type = "info") => {
    setNotification({ note, type })
    setTimeout(() => setNotification(null),
      6000)
  }
 
  const logOutH = () => {
   

    try {
      window.localStorage.removeItem("userCreated")
      setUser(null)
     
      console.log("After logging out:", window.localStorage)
    }
    catch (expection) {
      console.log("Failed logout:", expection)
    }
  }


  const switchRef = useRef()

  const addBlog = async (blogObj) => {
    try {
      const blogToAdd = await blogService.addBlog(blogObj)
      blogService
        .getAll()
        .then(blogs => setBlogs(blogs))
      switchRef.current.hideData()

      navi(`"${blogToAdd.title}" by ${blogToAdd.author} added `)
    }
    catch (exception) {
      navi("Failed submitting blog should have title and url", "error")
    }
  }

 
  const addLike = async (blogObj, blogId) => {
    try {
      const likedBlog = await blogService.addLike(blogObj, blogId)
      blogService.getAll().then(blogs => setBlogs(blogs))
      navi(`Liked "${likedBlog.title}" succesfully`)
    }
    catch (exception) {
      navi("Failed liking a blog", "error")
    }
  }


  const deleteBlog = async (blogObj) => {
    try {
      await blogService.deleteBlog(blogObj)
      blogService
        .getAll()
        .then(blogs => setBlogs(blogs))

      navi(`Deleted blog "${blogObj.title}" `)
    }
    catch (exception) {
      navi(`Failed deleting "${blogObj.title}" . Only user who submitted can delete`, "error")
    }
  }



  const logIn = async (event) => {
    event.preventDefault()
    console.log("Login with: ", username, password)

    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem("userCreated", JSON.stringify(user))
      
      blogService.setToken(user.token)
      
      setUser(user)
      setUsername("")
      setPassword("")

      console.log("user:", user)
    }
   
    catch (exception) {
      navi("Failed login, incorrect password or username", "error")
    }}

  const addUser = (event) => setUsername(event.target.value)
  const addPass = (event) => setPassword(event.target.value)

  const loginData = () => (
    <form onSubmit={logIn}>
      <div>Username:{" "}
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={addUser}
        />
      </div>
      <div>
          Password: {" "}
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={addPass}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )
  return (
    <div>
      <h2>Login </h2>
      <Popup message={message} />
      { user === null
        ? loginData()
        : <div>
          <p>
            <i>{user.name}</i> showed up.{" "}
            <button type="submit" onClick={logOutH}>Logout</button>
          </p>
          <Switch buttonLabel="New blog" ref={switchRef}>
            <AddBlog addBlog={addBlog}  />
          </Switch>

          <Bloglist blogs={blogs} addLike={addLike} deleteBlog={deleteBlog} />
        </div>
      }
    </div>
  )
}

export default App
