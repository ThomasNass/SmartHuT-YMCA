import React, { useEffect, useState } from "react";
import * as classes from "./App.module.css";
import Connect from "./Connect.jsx";
import data from "./data.json"
// import getAll from "./js/script.js";

const App = () => {
    const devices = data
    // useEffect(() => {
    //     (async () => {
    //         console.log("in sorting")
    //         const sortedDevices = await getAll();
    //         console.log(sortedDevices)
    //         setDevices(...sortedDevices);

    //     })
    // }, [])



    return (
        <>
            <h1 className={classes["header"]}>App Component</h1>
            <Connect id="google_translate_element" devices={devices} />

        </>
    );
};

export default App;
