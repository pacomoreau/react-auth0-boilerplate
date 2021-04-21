import { useApiPost, useApiPatch, useApiDelete } from "apis/fake-api"

export const useCreatePost = () => {
  return useApiPost("/posts", "posts")
}

export const useUpdatePost = (id) => {
  return useApiPatch("/posts", "posts", "post")
}

export const useDeletePost = () => {
  return useApiDelete("/posts", "posts")
}
