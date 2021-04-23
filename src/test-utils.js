import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react"
import theme from "./theme"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const Providers = ({ children }) => {
  return (
    <MemoryRouter>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider options={{ useSystemColorMode: false }}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </MemoryRouter>
  )
}

const customRender = (ui, options = {}) => render(ui, { wrapper: Providers, ...options })

export * from "@testing-library/react"
export { customRender as render }
