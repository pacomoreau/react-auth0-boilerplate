import { useAuth0 } from "@auth0/auth0-react"
import { Button, Flex, Text } from "@chakra-ui/react"
import { DarkModeToggle } from "components/DarkModeToggle"
import { LogoIcon } from "components/icons/LogoIcon"
import { Link } from "components/Link"

export const Header = () => {
  const { isAuthenticated, logout } = useAuth0()

  return (
    <Flex width="100%" justifyContent="space-between" alignItems="center" py="1rem">
      <Flex flexGrow="1" alignItems="center">
        <Link to="/">
          <LogoIcon />
        </Link>
        <Text fontSize="xl" mx="1rem">
          Boilerplate
        </Text>
      </Flex>
      {isAuthenticated && (
        <Button mx="1rem" onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </Button>
      )}
      <DarkModeToggle />
    </Flex>
  )
}
