import axios from "axios"
import { useMutation, useQueryClient } from "react-query"

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation((values) => axios.post("/posts", values).then((res) => res.data), {
    onSuccess: () => queryClient.refetchQueries(["posts"], { active: true }),
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (values) => axios.patch(`/posts/${values.id}`, values).then((res) => res.data),
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

  return useMutation((postId) => axios.delete(`/posts/${postId}`).then((res) => res.data), {
    onSuccess: () => queryClient.refetchQueries("posts"),
  })
}
