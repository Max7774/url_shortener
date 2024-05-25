import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./Components/App/App";
import Providers from "Components/Providers/Providers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Providers>
    <App />
  </Providers>
);
