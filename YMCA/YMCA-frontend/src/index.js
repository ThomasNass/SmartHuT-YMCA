import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { RestartButton } from "./RestoreButton";
import { SignOutButton } from "./SignOutButton";
import { History } from "./Hisotry";
import { Observer } from "./Observer";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
    <div>  
        <Observer/>
        <SignOutButton/>

    <App />
    </div>
  
);