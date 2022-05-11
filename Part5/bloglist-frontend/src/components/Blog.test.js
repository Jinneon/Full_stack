import React from "react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"

import Blog from "./Blog"
//test with  CI=true npm test

describe("Single blog in bloglist", () => {
  let block

  const blog = {
    title: "Testing",
    url: "https:/google.com",
    author: "Keke",
    likes: 5,
    user: {
      username: "keke",
      name: "keke2",
      id: "775533b6d145636ba5e535a7",
    }
  }

  const user = {
    username: "keke",
    name: "keke2",
    token: "testoken"
  }
  const jestHandler = jest.fn()
  beforeEach(() => {
   
    block = render(<Blog
      blog={blog}
      addLike={jestHandler}
      deleteBlog={jestHandler}
      user={user}
    />).block
  })

  test("Show blog's author and title when blog is not visible", () => {
    const element = screen.getByText(`${blog.title} by ${blog.author}`)
    expect(element).toBeDefined()
    const hidden = block.querySelector(".hideData")
    expect(hidden).not.toHaveStyle("display: none")

    const shown = block.querySelector(".showData")
    expect(shown).toHaveStyle("display: none")
  })
//5.14
  test("Number of likes and url is diplayed, when \"View\" button has been clicked", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("View")
    await user.click(button)

    const shown = block.querySelector(".showData")
    expect(shown).not.toHaveStyle("display: none")

    const url = screen.getByText(`${blog.url}`, { exact: false })
    expect(url).toBeDefined()

    const likes = screen.getByText(`${blog.likes}`, { exact: false })
    expect(likes).toBeDefined()
  })

  test("Call event handler twice if like button is pressed twice", async () => {
    const user = userEvent.setup()
    const viewB = screen.getByText("View")
    await user.click(viewB)

    const likeB = screen.getByText("Like")
    await user.click(likeB)
    await user.click(likeB)

    expect(jestHandler.mock.calls).toHaveLength(2)
  })
}) 