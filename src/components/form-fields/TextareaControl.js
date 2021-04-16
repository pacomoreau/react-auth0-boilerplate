import { Control, Error } from "./index"
import { Field } from "react-final-form"
import { FormLabel, Textarea } from "@chakra-ui/react"

const AdaptedTextarea = ({ input, meta, ...rest }) => (
  <Textarea {...input} {...rest} isInvalid={meta.error && meta.touched} />
)

export const TextareaControl = ({ name, label }) => (
  <Control name={name} my={4}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Field name={name} component={AdaptedTextarea} placeholder={label} id={name} />
    <Error name={name} />
  </Control>
)
