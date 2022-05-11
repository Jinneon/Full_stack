import { useState } from "react"

const AddBlog = ({ addBlog }) => {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [author, setAuthor] = useState("")

  const titleH = (event) => setTitle(event.target.value)
  const urlH = (event) => setUrl(event.target.value)
  const authorH = (event) => setAuthor(event.target.value)

  const handleAddBlog = (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      url: url,
      author: author,
    }
    addBlog(blog)
    setTitle("")
    setUrl("")
    setAuthor("")
  }

  return (
    <div  className="addBlog">
      <h3>Add a new blog?</h3>

      <form onSubmit={handleAddBlog}>
        <div>
        Title:{" "}
          <input
            type="text"
            id="title"
            value={title}
            name="Title"
            placeholder="Title"
            onChange={titleH}
          />
        </div>
        <div>
        URL:{" "}
          <input
            type="text"
            id="url"
            value={url}
            name="URL"
            placeholder="Url"
            onChange={urlH}
          />
        </div>
        <div>
        Author:{" "}
          <input
            type="text"
            id="author"
            value={author}
            name="Author"
            placeholder="Author"
            onChange={authorH}
          />
        </div>

        <div>
          <button type="submit"id="addBlog" >Add blog</button>
        </div>
      </form>
    </div>
  )
}
export default AddBlog