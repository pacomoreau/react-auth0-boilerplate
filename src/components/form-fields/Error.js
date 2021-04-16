import { useField } from "react-final-form"
import { FormErrorMessage } from "@chakra-ui/react"

export const Error = ({ name }) => {
  const {
    meta: { error },
  } = useField(name, { subscription: { error: true } })
  return <FormErrorMessage>{error}</FormErrorMessage>
}
