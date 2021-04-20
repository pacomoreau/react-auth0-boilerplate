import { api } from "../api"
import { useMutation, useQueryClient } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  return useMutation(
    async (values) => {
      const accessToken = await getAccessTokenSilently()

      return api
        .post("/posts", values, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((res) => res.data)
    },
    {
      onSuccess: () => queryClient.refetchQueries(["posts"], { active: true }),
    }
  )
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  return useMutation(
    async (values) => {
      const accessToken = await getAccessTokenSilently()

      return api
        .patch(`/posts/${values.id}`, values, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => res.data)
    },
    {
      onMutate: async (values) => {
        await queryClient.cancelQueries(["post", values.id])

        const previousValues = queryClient.getQueryData(["post", values.id])

        queryClient.setQueryData("todos", (old) => ({
          ...old,
          ...values,
        }))

        return previousValues
      },
      onError: (previousValues) =>
        queryClient.setQueryData(["post", previousValues.id], previousValues),
      onSettled: (values) => {
        queryClient.invalidateQueries("posts")
        queryClient.invalidateQueries(["post", values.id])
      },
    }
  )
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()

  return useMutation(
    async (postId) => {
      const accessToken = await getAccessTokenSilently()

      return api
        .delete(`/posts/${postId}`, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((res) => res.data)
    },
    {
      onSuccess: () => queryClient.refetchQueries("posts"),
    }
  )
}
