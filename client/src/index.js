import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// Auth Context
import { AuthContextProvider } from "./store/auth-context";

import "./index.css";

import App from "./App";

ReactDOM.render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
  document.getElementById("root")
);
