import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";

// Font files
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.Fragment>
);
