import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import SignalRContext from "./Components/Contexts/SignalRContext";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
    <>
        <SignalRContext>
            <App />
        </SignalRContext>
    </>
);