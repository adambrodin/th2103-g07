import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import StartPage from "./StartPage/startpage";
require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <StartPage />
  </React.StrictMode>,
  document.getElementById("root")
);
