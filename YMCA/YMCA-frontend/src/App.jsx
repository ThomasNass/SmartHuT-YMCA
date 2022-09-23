import React from "react";
import * as classes from "./App.module.css";
import Navbar from "./navbar.jsx"
import Head from "./Head.jsx";



const App = (props) => {
    console.log(classes);
  

    return (
        <Navbar>
           <Head title= "Inga Larm"/>
        </Navbar>
    );
};

export default App;
