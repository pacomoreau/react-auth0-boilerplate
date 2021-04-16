import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import { Auth0Provider } from "@auth0/auth0-react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react"
import { AuthRoute } from "components/AuthRoute"
import Home from "pages/Home"
import Create from "pages/Create"
import theme from "./theme"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error?.response?.status === 404 || error?.response?.status >= 500) {
          return false // no retry for some error codes
        }
        return 3
      },
    },
  },
})

const App = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENTID}
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeProvider options={{ useSystemColorMode: false }}>
            <QueryClientProvider client={queryClient}>
              <Switch>
                <AuthRoute exact authenticated={true} path="/" children={<Home />} />
                <AuthRoute exact authenticated={true} path="/create" children={<Create />} />
              </Switch>
            </QueryClientProvider>
          </ColorModeProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Auth0Provider>
  )
}

export default App
