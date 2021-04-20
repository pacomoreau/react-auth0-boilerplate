import { api } from "../api"
import { useQuery } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"

export const useUsers = () => {
  const { getAccessTokenSilently } = useAuth0()

  return useQuery("users", async () => {
    const accessToken = await getAccessTokenSilently()

    return api
      .get("/users", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((res) => res.data)
  })
}
