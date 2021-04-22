import { withAuthenticationRequired } from "@auth0/auth0-react"
import { Route } from "react-router-dom"
import { DefaultLayout } from "layouts/DefaultLayout"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from "components/ErrorFallback"

const Component = ({ children, Layout }) => (
  <Layout>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => console.warn("reset error boundary")}
    >
      {children}
    </ErrorBoundary>
  </Layout>
)

const AuthenticatedComponent = withAuthenticationRequired(Component)

export const AuthRoute = ({ children, authenticated = true, Layout = DefaultLayout, ...rest }) => (
  <Route {...rest}>
    {authenticated && <AuthenticatedComponent Layout={Layout}>{children}</AuthenticatedComponent>}
    {!authenticated && <Component Layout={Layout}>{children}</Component>}
  </Route>
)
