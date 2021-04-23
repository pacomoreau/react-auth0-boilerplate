import { usePosts } from "hooks/usePostQueries"
import { Stack, Text } from "@chakra-ui/react"
import { Link } from "components/Link"

export const Posts = () => {
  const { data: posts, isLoading, isError, error } = usePosts()

  return (
    <Stack spacing={2} mb={2} data-testid="posts">
      {isError && <Text size="xl">{error.message}</Text>}
      {isLoading && <Text size="xl">Loading...</Text>}
      {posts &&
        posts.map((post) => (
          <Link key={post.id} to={`/edit/${post.id}`}>
            {post.title}
          </Link>
        ))}
    </Stack>
  )
}
