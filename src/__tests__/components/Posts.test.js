import { render, screen, waitFor } from "../../test-utils"
import { Posts } from "components/Posts"

describe("Posts", () => {
  it("should render loading text", () => {
    render(<Posts />)

    const posts = screen.getByTestId("posts")

    expect(posts).toBeInTheDocument()
    expect(posts).toHaveTextContent(/Loading.../i)
  })

  it("should render list of posts", async () => {
    render(<Posts />)

    // wait for 600ms for the get posts
    await new Promise((r) => setTimeout(r, 600))

    const posts = await waitFor(() => screen.getByTestId("posts"))

    expect(posts).toBeInTheDocument()
    expect(posts.childElementCount).toBe(2)
    expect(posts.childNodes[0]).toHaveTextContent(/Title of post 1/i)
  })
})
