import { useQuery } from "react-query"
import axios from "axios"

export const usePost = (id) => {
  return useQuery(["post", id], () => axios.get(`/posts/${id}`).then((res) => res.data))
}

export const usePosts = () => {
  return useQuery("posts", () => axios.get("/posts").then((res) => res.data))
}
