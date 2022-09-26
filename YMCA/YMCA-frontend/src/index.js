import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { SignalRContextProvider } from "./Components/Contexts/SignalRContext";
import { Observer } from "./Components/Observer";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
    <>
        <SignalRContextProvider>
            <App />
        </SignalRContextProvider>
    </>
);