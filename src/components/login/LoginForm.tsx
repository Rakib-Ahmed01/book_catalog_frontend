/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Group, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from "../../features/auth/authApi"
import { ErrorResponse, LoginPayload } from "../../types"

export function LoginForm() {
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password does not match",
    },
  })

  const handleSubmit = async (values: LoginPayload) => {
    try {
      await login(values).unwrap()
      toast.success("Login successfull")
      navigate("/")
    } catch (error) {
      toast.error((error as ErrorResponse).data.message)
    }
  }

  return (
    <Box mt={"sm"} w={"95%"} maw={500} mx={"auto"}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
          my={4}
        />

        <TextInput
          withAsterisk
          label="Password"
          placeholder="password"
          {...form.getInputProps("password")}
        />

        <Group mt="md">
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  )
}
