import React, { useContext } from "react";
import * as classes from "./App.module.css";
import SignalRContext from "./Components/Contexts/SignalRContext";

const App = () => {
    const signalRContext = useContext(SignalRContext);
    console.log(signalRContext);
    return (
        <h1 className={classes["header"]}>App Component</h1>
    );
};

export default App;
