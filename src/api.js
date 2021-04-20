import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// instance.interceptors.request.use(
//   async (config) => {
//     const { getAccessTokenSilently } = useAuth0()
//     const accessToken = await getAccessTokenSilently()
//     console.warn("FOO", accessToken)

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`
//     }

//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

export const api = instance
