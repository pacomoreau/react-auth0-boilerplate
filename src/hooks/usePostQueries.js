import { useApiGet } from "apis/fake-api"

export const usePost = (id) => {
  return useApiGet(["post", id], `/posts/${id}`)
}

export const usePosts = () => {
  return useApiGet("posts", "/posts")
}
