import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Base styles
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
