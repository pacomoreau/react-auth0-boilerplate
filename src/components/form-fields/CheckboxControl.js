import { useField } from "react-final-form"
import { Checkbox, FormControl, FormErrorMessage } from "@chakra-ui/react"

export const CheckboxControl = ({ name, children }) => {
  const {
    input: { ...input },
    meta: { error, touched, invalid },
  } = useField(name, {
    type: "checkbox",
  })
  return (
    <FormControl isInvalid={touched && invalid} my={4}>
      <Checkbox {...input} isInvalid={touched && invalid} my={4}>
        {children}
      </Checkbox>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
