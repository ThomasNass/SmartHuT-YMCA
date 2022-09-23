import React from "react";
import * as classes from "./App.module.css";
import React, { useEffect } from 'react';


const App = () => {
    console.log(classes);
    useEffect(() => {
        localStorage.setItem("load","load");
        if(!localStorage.getItem("load") == "load"){
            window.location.reload();  
         }
    })


    return (
        <h1 className={classes["header"]}>App Component</h1>
    );
};

export default App;
