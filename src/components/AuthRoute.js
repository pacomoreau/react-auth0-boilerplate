import { withAuthenticationRequired } from "@auth0/auth0-react"
import { Route } from "react-router-dom"
import { DefaultLayout } from "layouts/DefaultLayout"

const Component = ({ children, Layout }) => <Layout>{children}</Layout>

const AuthenticatedComponent = withAuthenticationRequired(Component)

export const AuthRoute = ({ children, authenticated = true, Layout = DefaultLayout, ...rest }) => (
  <Route {...rest}>
    {authenticated && <AuthenticatedComponent Layout={Layout}>{children}</AuthenticatedComponent>}
    {!authenticated && <Component Layout={Layout}>{children}</Component>}
  </Route>
)
