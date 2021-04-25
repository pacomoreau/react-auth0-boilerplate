import { useAuth0 } from "@auth0/auth0-react"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  useColorMode,
} from "@chakra-ui/react"
import { Container } from "components/Container"
import { Main } from "components/Main"
import { LoadingSkeleton } from "components/LoadingSkeleton"
import { Header } from "./Header"

export const DefaultLayout = ({ children }) => {
  const { isLoading, error } = useAuth0()
  const { colorMode } = useColorMode()
  const bgColor = { light: "gray.50", dark: "gray.900" }
  const color = { light: "black", dark: "white" }

  return (
    <Stack bg={bgColor[colorMode]} color={color[colorMode]}>
      <Container minHeight="100vh">
        <Header />
        <Main>
          {isLoading && <LoadingSkeleton />}
          {!isLoading && !error && <>{children}</>}
        </Main>
      </Container>
      {error && (
        <Alert status="error" position="fixed" bottom="0">
          <AlertIcon />
          <AlertTitle mr={2}>Error during login</AlertTitle>
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>
      )}
    </Stack>
  )
}
