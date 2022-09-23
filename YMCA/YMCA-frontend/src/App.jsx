import React, { useEffect, useContext } from "react";
import Navbar from "./navbar.jsx"
import Head from "./Head.jsx";
import Building from "./Components/Building/Building";
import SignalRContext from "./Components/Contexts/SignalRContext";

const App = () => {
    const signalRContext = useContext(SignalRContext);

    return (
        <>
            {(signalRContext.alarmCount < 1) ? <Head /> : <Warninghead alarmCount={props.alarmCount} />}
            <Building />
            <Navbar alarmCount={signalRContext.alarmCount}></Navbar>
        </>

    );
};

export default App;
