import { useField } from "react-final-form"
import { FormControl } from "@chakra-ui/react"

export const Control = ({ name, ...rest }) => {
  const {
    meta: { error, touched },
  } = useField(name, { subscription: { touched: true, error: true } })
  return <FormControl {...rest} isInvalid={error && touched} />
}
