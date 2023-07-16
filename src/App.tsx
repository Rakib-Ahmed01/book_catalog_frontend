import { Box } from "@mantine/core"
import { RouterProvider } from "react-router-dom"
import Spinner from "./components/shared/Spinner"
import useAuthCheck from "./hooks/useAuthCheck"
import { router } from "./routes"

function App() {
  const authChecked = useAuthCheck()

  return (
    <Box sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
      {authChecked ? <RouterProvider router={router} /> : <Spinner />}
    </Box>
  )
}

export default App
