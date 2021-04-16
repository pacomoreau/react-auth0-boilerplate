import { useField } from "react-final-form"
import { Control, Error } from "./index"
import { FormLabel, Select } from "@chakra-ui/react"

export const SelectControl = ({
  name,
  label,
  options = [],
  valueKey = "value",
  labelKey = "label",
}) => {
  const { input, meta } = useField(name)
  return (
    <Control name={name} my={4}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select {...input} isInvalid={meta.error && meta.touched} id={name} placeholder={label}>
        {options.map((option) => (
          <option key={option[valueKey]} value={option[valueKey]}>
            {option[labelKey]}
          </option>
        ))}
      </Select>
      <Error name={name} />
    </Control>
  )
}
