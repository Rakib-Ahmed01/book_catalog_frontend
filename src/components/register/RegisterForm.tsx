/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Button, Group, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../../features/auth/authApi"
import { ErrorResponse, RegisterPayload } from "../../types"

export function RegisterForm() {
  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6
          ? null
          : "Password must be at least 6 characters long",
    },
  })

  const handleSubmit = async (values: RegisterPayload) => {
    try {
      await register(values).unwrap()
      toast.success("Register successfull")
      navigate("/login")
    } catch (error) {
      toast.error((error as ErrorResponse).data.message)
    }
  }

  return (
    <Box mt={"sm"} w={"95%"} maw={500} mx={"auto"}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="your name"
          {...form.getInputProps("name")}
        />
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
