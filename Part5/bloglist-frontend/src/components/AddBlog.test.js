import React from "react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"

import AddBlog from "./AddBlog"
//CI=true npm test

describe("Add a new blog", () => {
  test("Call handleAddBlog correcty", async () => {
    const addBlog = jest.fn()
    const user = userEvent.setup()
    render(<AddBlog addBlog={addBlog} />)

    const title = screen.getByPlaceholderText("Title")
    const URL = screen.getByPlaceholderText("Url")
    const author = screen.getByPlaceholderText("Author")
    await user.type(title, "Fishing Season")
    await user.type(URL, "https:/www.google.com")
    await user.type(author, "Fishing pro")
    
    const button = screen.getByText("Add blog")
    await user.click(button)
    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe("Fishing Season")
    expect(addBlog.mock.calls[0][0].url).toBe("https:/www.google.com")
    expect(addBlog.mock.calls[0][0].author).toBe("Fishing pro")
  })
}) 