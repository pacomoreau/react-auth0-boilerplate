// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
import { server } from "mocks/server"

const user = {
  email: "bob@test.com",
  email_verified: true,
  sub: "123",
  name: "Bob",
}

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    isLoading: false,
    user,
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
    getAccessTokenWithPopup: jest.fn(),
    getAccessTokenSilently: jest.fn(() => Promise.resolve("test-token")),
    getIdTokenClaims: jest.fn(),
    loginWithPopup: jest.fn(),
  }),
}))

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
  jest.unmock("@auth0/auth0-react")
})
