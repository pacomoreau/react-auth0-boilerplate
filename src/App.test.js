import React from "react"
import { screen } from "@testing-library/react"
import { render } from "./test-utils"
import App from "./App"

test("renders todo text", () => {
  render(<App />)
  const textElement = screen.getByText(/todo/i)
  expect(textElement).toBeInTheDocument()
})
