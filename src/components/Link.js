import { Link as RouterLink } from "react-router-dom"
import { Link as ChakraLink } from "@chakra-ui/react"

export const Link = ({ children, ...rest }) => (
  <ChakraLink as={RouterLink} {...rest}>
    {children}
  </ChakraLink>
)
