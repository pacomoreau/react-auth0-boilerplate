import { useApiGet } from "apis/fake-api"

export const useUsers = () => {
  return useApiGet("users", "/users", false)
}
