import { Form } from "react-final-form"
import {
  CheckboxControl,
  InputControl,
  MultiSelectControl,
  SelectControl,
  TextareaControl,
} from "components/form-fields"
import { Box, Button, ButtonGroup } from "@chakra-ui/react"

const onSubmit = async (values) => {
  console.log("submit", values)
}

const validateForm = (values) => {
  const errors = {}

  if (!values.lastName) {
    errors.lastName = "Required"
  }
  if (!values.colors || values.colors.length === 0) {
    errors.colors = "Required"
  }
  if (!values.countries || values.countries.length === 0) {
    errors.countries = "Required"
  }

  return errors
}

export const SampleForm = () => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validateForm}
      render={({ handleSubmit, form, errors, submitting, pristine, values }) => (
        <Box
          as="form"
          p={4}
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          onSubmit={handleSubmit}
        >
          {/* 
            This example uses a mixture of custom field components using useField() 
            and components adapted to take the { input, meta } structure <Field/>
            provides
            */}
          <InputControl name="firstName" label="First Name" />
          <InputControl name="lastName" label="Last Name" />
          <TextareaControl name="notes" label="Notes" />
          <SelectControl
            name="colors"
            label="Choose a color"
            options={[
              { label: "Red", value: "red" },
              { label: "Green", value: "green" },
              { label: "Blue", value: "blue" },
            ]}
          />
          <MultiSelectControl
            name="countries"
            label="Choose some countries"
            options={[
              { label: "France", value: "FR" },
              { label: "Belgium", value: "BE" },
              { label: "Canada", value: "CA" },
              { label: "United Kingdom", value: "UK" },
              { label: "United States", value: "US" },
            ]}
          />
          <CheckboxControl name="metal">Metal ?</CheckboxControl>
          <ButtonGroup spacing={4}>
            <Button isLoading={submitting} loadingText="Submitting" type="submit">
              Submit
            </Button>
            <Button variant="outline" onClick={form.reset} isDisabled={submitting || pristine}>
              Reset
            </Button>
          </ButtonGroup>
          <Box as="pre" my={10}>
            {JSON.stringify(values, null, 2)}
          </Box>
          <Box as="pre" my={10}>
            {JSON.stringify(errors, null, 2)}
          </Box>
        </Box>
      )}
    />
  )
}
