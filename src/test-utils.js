import React from "react"
import { render } from "@testing-library/react"
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react"
import theme from "./theme"

const Providers = ({ children }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider options={{ useSystemColorMode: false }}>{children}</ColorModeProvider>
    </ChakraProvider>
  )
}

const customRender = (ui, options = {}) => render(ui, { wrapper: Providers, ...options })

export * from "@testing-library/react"
export { customRender as render }
