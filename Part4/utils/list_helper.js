const dummy = () => {
    return 1
  }
  
  const favoriteBlog = (bloglist) => {
    return bloglist.reduce((earlierBlog, cBlog) =>
      earlierBlog.likes > cBlog.likes
        ? earlierBlog
        : cBlog,
    0
    )
  }

  const totalLikes = (bloglist) => {
    return bloglist.reduce(
      (likesAmount, blog) => likesAmount + blog.likes,
      0
    )
  }
  
  const mostBlogs = (bloglist) => {
   
    const writerList = bloglist.map(blog => blog.author)
    let authorsCounted = writerList.reduce((Authors, author) => {
      if (author in Authors)
       {
        Authors[author]++
      } 
      else
      {
        Authors[author] = 1
      }
  
      return Authors
    }, {})
  
    const values = Object.values(authorsCounted)

    const bCount = Math.max(...values)
  
    const author = Object.keys(authorsCounted).reduce((earlierA, cA) => {
      return authorsCounted[earlierA] > authorsCounted[cA]
        ? earlierA
        : cA
    })
    return {
      author: author,
      blogs: bCount
    }
  }

  module.exports = { dummy, totalLikes, mostBlogs, favoriteBlog } 
  
