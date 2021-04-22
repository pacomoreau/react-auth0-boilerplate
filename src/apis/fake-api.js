import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"
import { useHistory } from "react-router-dom"
import { useToast } from "@chakra-ui/react"

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const useApiGet = (key, url, redirectIf404 = true, displayError = true) => {
  const { getAccessTokenSilently } = useAuth0()
  const history = useHistory()
  const toast = useToast()

  return useQuery(key, async () => {
    try {
      const accessToken = await getAccessTokenSilently()
      const response = await api.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      return response.data
    } catch (error) {
      if (redirectIf404 && error?.response?.status === 404) {
        history.push("/404")
      }
      if (displayError && error?.response?.status !== 404) {
        toast({
          id: "api-error-get",
          title: "Something went wrong",
          description: error?.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    }
  })
}

export const useApiPost = (url, itemsKey = null, displayError = true) => {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()
  const toast = useToast()

  return useMutation(
    async (values) => {
      try {
        const accessToken = await getAccessTokenSilently()
        const response = await api.post(url, values, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })

        return response.data
      } catch (error) {
        if (displayError) {
          toast({
            id: "api-error-post",
            title: "Something went wrong",
            description: error?.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        }
      }
    },
    {
      onSuccess: () => {
        if (itemsKey) {
          queryClient.refetchQueries([itemsKey], { active: true })
        }
      },
    }
  )
}

export const useApiPatch = (url, itemsKey = null, itemKey = null, displayError = true) => {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()
  const toast = useToast()

  return useMutation(
    async (values) => {
      try {
        const accessToken = await getAccessTokenSilently()
        const response = await api.patch(`${url}/${values.id}`, values, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })

        return response.data
      } catch (error) {
        if (displayError) {
          toast({
            id: "api-error-patch",
            title: "Something went wrong",
            description: error?.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        }
      }
    },
    {
      onMutate: async (values) => {
        if (itemsKey && itemKey) {
          await queryClient.cancelQueries([itemKey, values.id])

          const previousValues = queryClient.getQueryData([itemKey, values.id])

          queryClient.setQueryData(itemsKey, (old) => [...old, { ...values }])

          return previousValues
        }
        return values
      },
      onError: (previousValues) => {
        if (itemsKey && itemKey) {
          queryClient.setQueryData([itemKey, previousValues.id], previousValues)
        }
      },
      onSettled: (values) => {
        if (itemsKey && itemKey) {
          queryClient.invalidateQueries(itemsKey)
          queryClient.invalidateQueries([itemKey, values.id])
        }
      },
    }
  )
}

export const useApiDelete = (url, itemsKey = null, displayError = true) => {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()
  const toast = useToast()

  return useMutation(
    async (postId) => {
      try {
        const accessToken = await getAccessTokenSilently()
        const response = api.delete(`${url}/${postId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })

        return response.data
      } catch (error) {
        if (displayError) {
          toast({
            id: "api-error-delete",
            title: "Something went wrong",
            description: error?.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        }
      }
    },
    {
      onSuccess: () => {
        if (itemsKey) {
          queryClient.refetchQueries(itemsKey)
        }
      },
    }
  )
}
