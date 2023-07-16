import { Box } from "@mantine/core"
import { Outlet } from "react-router-dom"
import { HeaderMegaMenu } from "../components/shared/Header"

export default function Main() {
  return (
    <>
      <HeaderMegaMenu />
      <Box px={12}>
        <Outlet />
      </Box>
    </>
  )
}
