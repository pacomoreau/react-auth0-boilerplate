import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"
import { useHistory } from "react-router-dom"

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const useApiGet = (key, url, redirectIf404 = true) => {
  const { getAccessTokenSilently } = useAuth0()
  const history = useHistory()

  return useQuery(key, async () => {
    try {
      const accessToken = await getAccessTokenSilently()
      const response = await api.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      return response.data
    } catch (error) {
      console.warn(error)
      if (redirectIf404 && error?.response?.status === 404) {
        history.push("/404")
      }
    }
  })
}

export const useApiPost = (url, refreshKey = null) => {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  return useMutation(
    async (values) => {
      try {
        const accessToken = await getAccessTokenSilently()
        const response = await api.post(url, values, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })

        return response.data
      } catch (error) {
        console.warn(error)
      }
    },
    {
      onSuccess: () => {
        if (refreshKey) {
          queryClient.refetchQueries([refreshKey], { active: true })
        }
      },
    }
  )
}
