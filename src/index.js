import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import "./index.css";
import AppContext from "./context";
import App from "./App";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      preventDuplicate
    >
      <AppContext>
        <App />
      </AppContext>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
