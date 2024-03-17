import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import SnackBar from "./components/SnackBar";

import App from "./App";
import BoilerplateTheme from "./theme";
import "./index.css";
import store from "./store";

const handleUseSnackbar = (key, message) => (
  <SnackBar id={key} options={message && JSON.parse(message)} />
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={BoilerplateTheme}>
          <SnackbarProvider
            preventDuplicate
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            content={handleUseSnackbar}
          >
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </BrowserRouter>
);
