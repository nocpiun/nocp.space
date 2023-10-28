import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";

console.log("%cWelcome to Noah's Website!", "font-style: italic; color: gray");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
