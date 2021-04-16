import { render, screen } from "../../test-utils"
import { DarkModeToggle } from "components/DarkModeToggle"

describe("DarkModeToggle", () => {
  it("should render the dark/light toggle", () => {
    render(<DarkModeToggle />)

    const toggle = screen.getByTestId("dark-mode-toggle")

    expect(toggle).toBeInTheDocument()
  })
})
