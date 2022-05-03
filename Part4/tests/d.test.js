
const listHelper = require("../utils/list_helper")

test("Result should be one", () => {
  const blogs =[]
  const res = listHelper.dummy(blogs)

  expect(res).toBe(1)
}) 

describe("Total likes", () => {
    test("Likes for bloglist with one blog", () => {
      const res = listHelper.totalLikes(listWithOneBlog)
      expect(res).toBe(500)
    })
    test("Likes for bloglist with many blogs", () => {
      const res = listHelper.totalLikes(multipleBlogs)
      expect(res).toBe(36)
    })
  
    test("Likes for bloglist with no blogs", () => {
      const res = listHelper.totalLikes(emptyBlogList)
      expect(res).toBe(0)
    })
  })

  describe("Most blog", () => {
    test("Author who has the most blogs in the list", () => {
      const res = listHelper.mostBlogs(multipleBlogs)
      expect(res).toEqual({ author: "Robert C. Martin", blogs: 3 })
    })
  })
  
  describe("Favorite blog", () => {
    test("Show favorite blog with most likes from bloglist", () => {
      const res = listHelper.favoriteBlog(multipleBlogs)
      expect(res).toEqual(multipleBlogs[2])
    })
  })
  

  
  //*
  const listWithOneBlog = [
    {
      "title": "Test blog",
      "author": "Jinneon",
      "url": "www.google.com",
      "likes": 500,
      "_id": "6270ef591758ac4a6e27043b",
      "__v": 0
    }
  ]
  
  const multipleBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
  ]
  
  const emptyBlogList = []