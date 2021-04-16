import React from "react"
import { screen } from "@testing-library/react"
import { render } from "../../test-utils"
import Home from "pages/Home"

test("renders Home text", () => {
  render(<Home />)
  const textElement = screen.getByText(/Home/i)
  expect(textElement).toBeInTheDocument()
})
