import React, { useEffect } from "react";
import * as classes from "./App.module.css";
import Building from "./Components/Building/Building";

const App = () => {
    return (
        <>
            <h1 className={classes["header"]}>App Component</h1>
            <Building />
        </>
    );
};

export default App;
