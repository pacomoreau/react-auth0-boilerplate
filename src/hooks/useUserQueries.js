import { api } from "../api"
import { useQuery } from "react-query"

export const useUsers = () => {
  return useQuery("users", () => api.get("/users").then((res) => res.data))
}
