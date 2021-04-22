import { ButtonGroup, Button, Heading, Text } from "@chakra-ui/react"

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <Heading as="h1" size="xl">
        Error occured
      </Heading>
      <Text>{error.message}</Text>
      <ButtonGroup>
        <Button onClick={resetErrorBoundary}>Retry</Button>
      </ButtonGroup>
    </>
  )
}
