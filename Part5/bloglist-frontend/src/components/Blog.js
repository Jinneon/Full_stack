
import { useState } from "react"

const style = {
  paddingTop: 10,
  paddingBottom: 10,
  border: "solid",
  borderColor: "red",
  marginBottom: 5,
}

const Blog = ({ blog , addLike ,deleteBlog }) => {
  const [detailsShown, setDetailsShown] = useState(false)

  const hideIfV = { display: detailsShown ? "none" : "" }
  const showIfV = { display: detailsShown ? "" : "none" }
  const AddLike = (event) => {
    event.preventDefault()

    const bObj = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: blog.likes 
        ? blog.likes + 1
        : 1,
      user: blog.user.id
    }
    const blogId = blog.id

    console.log("add like to blogObj:",bObj)

    addLike(bObj, blogId)
  }


  const DeleteBlog = (event) => {
    event.preventDefault()
    const remo = window.confirm(`Removing blog "${blog.title}" by ${blog.author}?`)

    if (remo) {
      deleteBlog(blog)
    }
  }
  return (
    <div style={style} className="blog">

      <div style={hideIfV} className="hideData">
        <li key={blog.id}>
          {blog.title} by {blog.author}{" "}
          <button type="submit" id="view" onClick={() => setDetailsShown(true)}>View</button>
        </li>
      </div>

      <div style={showIfV}className="showData">
        <li key={blog.id}>
          {blog.title} by {blog.author}{" "}
          <button type="submit"id="hide" onClick={() => setDetailsShown(false)}>Hide</button><br/>
          Url: {blog.url}<br/>
          Likes: {blog.likes}{" "}<button type="submit" id="like" onClick={AddLike}>Like</button><br/>
          Blog added by: {blog.user.name}<br/>
          <button type="submit"  id="remove"onClick={DeleteBlog}>Delete</button><br/>
        </li>
      </div>

    </div>
  )
}
export default Blog
