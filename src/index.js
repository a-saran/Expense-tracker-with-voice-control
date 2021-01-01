import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ExpenseTrackerProvider } from "./context/context";
import "./index.css";

ReactDOM.render(
  <ExpenseTrackerProvider>
    <App />
  </ExpenseTrackerProvider>,
  document.getElementById("root")
);
