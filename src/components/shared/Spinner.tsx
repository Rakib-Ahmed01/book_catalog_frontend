import { Flex, Loader } from "@mantine/core"

export default function Spinner() {
  return (
    <Flex w={"100vw"} h={"80vh"} align={"center"} justify={"center"}>
      <Loader size={50} />
    </Flex>
  )
}
