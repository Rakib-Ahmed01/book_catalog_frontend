import { MantineProvider } from "@mantine/core"
import React from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import App from "./App.tsx"
import { store } from "./app/store.ts"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        fontFamily: "Karla, sans-serif",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Provider store={store}>
        <Toaster />
        <App />
      </Provider>
    </MantineProvider>
  </React.StrictMode>
)
