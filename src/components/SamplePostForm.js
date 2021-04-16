import { useRouter } from "next/router"
import { Form } from "react-final-form"
import { InputControl, SelectControl, TextareaControl } from "components/form-fields"
import { Heading, Box, Button, ButtonGroup, useToast } from "@chakra-ui/react"
import { useUsers } from "hooks/useUserQueries"
import { useCreatePost, useUpdatePost, useDeletePost } from "hooks/usePostMutations"
import _ from "lodash"

const onSubmit = (values, createPost, updatePost, deletePost, toast, router) => {
  const postValues = _.omit(values, ["action"])

  if (values.action === "create") {
    createPost(postValues, {
      onSuccess: (post) => {
        router.push(`/edit/${post.id}`)
        toast({
          title: "Post created !",
          description: `Your post (id ${post.id}) has been created successfully.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      },
    })
  }
  if (values.action === "update") {
    updatePost(postValues, {
      onSuccess: (post) => {
        toast({
          title: "Post updated !",
          description: `Your post (id ${post.id}) has been updated successfully.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      },
    })
  }
  if (values.action === "delete") {
    deletePost(postValues.id, {
      onSuccess: () => {
        router.push("/")
        toast({
          title: "Post deleted !",
          description: `Your post (id ${postValues.id}) has been deleted successfully.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      },
    })
  }
}

const validateForm = (values) => {
  const errors = {}

  if (values.action !== "delete") {
    if (!values.title) {
      errors.title = "Post title required."
    }
    if (!values.userId || values.userId.length === 0) {
      errors.userId = "User required."
    }
  }

  return errors
}

export const SamplePostForm = ({ post = null }) => {
  const toast = useToast()
  const router = useRouter()
  const { data: users, isLoading: usersLoading } = useUsers()
  const { mutate: createPost, isLoading: createPostLoading } = useCreatePost()
  const { mutate: updatePost, isLoading: updatePostLoading } = useUpdatePost()
  const { mutate: deletePost, isLoading: deletePostLoading } = useDeletePost()

  const loading = post === null ? createPostLoading : updatePostLoading || deletePostLoading

  return (
    <>
      <Heading as="h1" size="xl">
        {!post && "Create post"}
        {post && `Edit post (id: ${post.id})`}
      </Heading>
      <Form
        onSubmit={(values) => onSubmit(values, createPost, updatePost, deletePost, toast, router)}
        validate={validateForm}
        initialValues={post}
        render={({ handleSubmit, form, errors, submitting, values }) => (
          <Box as="form" p={4} rounded="lg" onSubmit={handleSubmit}>
            <InputControl name="title" label="Post title" />
            <TextareaControl name="body" label="Post description" />
            <SelectControl
              name="userId"
              label="Choose a user"
              options={users}
              valueKey="id"
              labelKey="name"
              isLoading={usersLoading}
            />
            <ButtonGroup spacing={4}>
              <Button
                isLoading={(submitting || loading) && values.action !== "delete"}
                isDisabled={loading && values.action === "delete"}
                loadingText="Submitting"
                type="submit"
                onClick={() => {
                  form.change("action", post ? "update" : "create")
                }}
              >
                {!post && "Create"}
                {post && "Update"}
              </Button>
              {post && (
                <Button
                  isLoading={(submitting || loading) && values.action === "delete"}
                  isDisabled={loading && values.action !== "delete"}
                  loadingText="Submitting"
                  type="submit"
                  onClick={() => {
                    form.change("action", "delete")
                  }}
                >
                  Delete
                </Button>
              )}
            </ButtonGroup>
            <Box as="pre" my={10}>
              {JSON.stringify(values, null, 2)}
            </Box>
            <Box as="pre" my={10}>
              {JSON.stringify(errors, null, 2)}
            </Box>
          </Box>
        )}
      />
    </>
  )
}
