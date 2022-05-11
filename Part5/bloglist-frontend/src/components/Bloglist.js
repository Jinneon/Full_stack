import Blog from "./Blog"

const Bloglist = ({ blogs,addLike,deleteBlog  }) => {

  return (
    <div>
      <h3>Blogs </h3>
      <ul>
        {blogs
          .sort((first, second) => second.likes - first.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike}deleteBlog={deleteBlog}  />
          )
        }
      </ul>
    </div>
  )
}

export default Bloglist