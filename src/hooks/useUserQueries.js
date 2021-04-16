import { useQuery } from "react-query"
import axios from "axios"

export const useUsers = () => {
  return useQuery("users", () => axios.get("/users").then((res) => res.data))
}
