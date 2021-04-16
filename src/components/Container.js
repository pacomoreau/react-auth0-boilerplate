import { Flex } from "@chakra-ui/react"

export const Container = (props) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      width="100%"
      maxWidth="60rem"
      marginX="auto"
      paddingX="1rem"
      {...props}
    />
  )
}
