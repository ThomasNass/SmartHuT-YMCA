import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { RestartButton } from "./RestoreButton";
import { SignOutButton } from "./SignOutButton";
import { History } from "./Hisotry";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
    <div>  
    <History />
    <RestartButton show={true} deviceId="cb241607-69f9-4a59-a039-36b872db77bc" email="alra21yg@student.ju.se"/>
    <SignOutButton />
    <App />
    </div>
  
);