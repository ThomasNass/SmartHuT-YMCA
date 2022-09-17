import React from "react";
import * as classes from "./App.module.css";

const App = () => {
    console.log(classes);
    return (
        <h1 className={classes["header"]}>App Component</h1>
    );
};

export default App;
