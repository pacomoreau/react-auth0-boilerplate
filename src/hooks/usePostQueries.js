import { api } from "../api"
import { useQuery } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"

export const usePost = (id) => {
  return useQuery(["post", id], () => api.get(`/posts/${id}`).then((res) => res.data))
}

export const usePosts = () => {
  const { getAccessTokenSilently } = useAuth0()

  return useQuery("posts", async () => {
    const accessToken = await getAccessTokenSilently()

    return api
      .get("/posts", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((res) => res.data)
  })
}
