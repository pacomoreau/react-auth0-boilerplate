import { usePosts } from "hooks/usePostQueries"
import { Heading, Stack, Text } from "@chakra-ui/react"
import { Link } from "components/Link"

const Home = () => {
  const { data, isLoading, isError, error } = usePosts()
  const posts = data ? data.slice(0, 10) : []

  return (
    <>
      <Heading as="h1" size="xl">
        Click on post to edit it
      </Heading>
      <Stack spacing={2} mb={2}>
        {isError && <Text size="xl">{error.message}</Text>}
        {isLoading && <Text size="xl">Loading...</Text>}
        {posts.map((post) => (
          <Link key={post.id} to={`/edit/${post.id}`}>
            {post.title}
          </Link>
        ))}
      </Stack>
      <Link to="/create">Create post</Link>
    </>
  )
}

export default Home
