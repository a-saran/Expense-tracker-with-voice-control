import React from "react";
import ReactDOM from "react-dom";
import { SpeechProvider } from "@speechly/react-client";
import App from "./App";
import { ExpenseTrackerProvider } from "./context/context";
import "./index.css";

ReactDOM.render(
  <SpeechProvider appId="a8b32998-c699-4f83-a34a-dfd72a1ec350" language="en-US">
    <ExpenseTrackerProvider>
      <App />
    </ExpenseTrackerProvider>
  </SpeechProvider>,
  document.getElementById("root")
);
