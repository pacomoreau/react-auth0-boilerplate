import { useField } from "react-final-form"
import { Control, Error } from "./index"
import { FormLabel, Input } from "@chakra-ui/react"

export const InputControl = ({ name, label }) => {
  const { input, meta } = useField(name)
  return (
    <Control name={name} my={4}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input {...input} isInvalid={meta.error && meta.touched} id={name} placeholder={label} />
      <Error name={name} />
    </Control>
  )
}
