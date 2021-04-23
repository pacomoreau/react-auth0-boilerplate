import { Heading } from "@chakra-ui/react"
import { Link } from "components/Link"
import { Posts } from "components/Posts"

const Home = () => {
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
