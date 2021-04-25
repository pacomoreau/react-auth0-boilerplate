import { Heading } from "@chakra-ui/react"
import { Link } from "components/Link"
import { Posts } from "components/Posts"
import { useDocumentTitle } from "hooks/useDocumentTitle"

const Home = () => {
  useDocumentTitle("Home - React Auth0 Boilerplate")

  return (
    <>
      <Heading as="h1" size="xl">
        Click on post to edit it
      </Heading>
      <Posts />
      <Link to="/create">Create post</Link>
    </>
  )
}

export default Home
