import { Flex, Loader } from "@mantine/core"

export default function Spinner() {
  return (
    <Flex h={"80vh"} align={"center"} justify={"center"}>
      <Loader size={50} />
    </Flex>
  )
}
