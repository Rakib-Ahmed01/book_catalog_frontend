import { Box } from "@mantine/core"
import { Outlet } from "react-router-dom"
import { FooterLinks } from "../components/shared/Footer"
import { HeaderMegaMenu } from "../components/shared/Header"

export default function Main() {
  return (
    <>
      <HeaderMegaMenu />
      <Box my={16} mih={"50vh"}>
        <Outlet />
      </Box>
      <FooterLinks
        data={[
          { title: "Facebook", links: [] },
          { title: "Twitter", links: [] },
          { title: "Instagram", links: [] },
        ]}
      />
    </>
  )
}
