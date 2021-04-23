import { rest } from "msw"

const posts = {
  1: { id: 1, userId: 1, title: "Title of post 1", body: "Lorem ipsum." },
  2: { id: 2, userId: 2, title: "Title of post 2", body: "Dolor sit amet." },
}

const users = {
  1: { id: 1, name: "Ann" },
  2: { id: 2, name: "Bob" },
}

export const handlers = [
  rest.get("/posts", (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.json(
        Object.entries(posts).map(([id, post]) => {
          return post
        })
      )
    )
  }),
  rest.get("/users", (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.json(
        Object.entries(users).map(([id, user]) => {
          return user
        })
      )
    )
  }),
  rest.get("/posts/:id", (req, res, ctx) => {
    const { id } = req.params
    const post = posts[id]

    if (typeof post === "undefined") {
      return res(ctx.status(404))
    }

    return res(ctx.delay(500), ctx.json(post))
  }),
  rest.post("/posts", (req, res, ctx) => {
    const post = { id: 123, ...req.body }

    return res(ctx.json(post))
  }),
  rest.patch("/posts/:id", (req, res, ctx) => {
    const post = req.body

    return res(ctx.delay(500), ctx.json(post))
  }),
  rest.delete("/posts/:id", (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json({}))
  }),
]
