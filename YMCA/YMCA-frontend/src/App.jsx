import React, { useEffect, useContext, useState } from "react";
import Navbar from "./navbar.jsx"
import Head from "./Head.jsx";
import Warninghead from "./Warninghead.jsx";
import Building from "./Components/Building/Building";
import SignalRContext from "./Components/Contexts/SignalRContext";
import { History } from "./Components/History/History.jsx";

const App = () => {
    const signalRContext = useContext(SignalRContext);
    const [showClimate, setShowClimate] = useState(true);
    const [showHistory, setShowHistory] = useState(false)

    const ClimateDisplay = () => {
        setShowClimate(true)
        setShowHistory(false)
    }

    const HistoryDisplay = () => {
        setShowClimate(false)
        setShowHistory(true)
    }

   

    return (
        <>
            {(signalRContext.alarmCount < 1) ? <Head /> : <Warninghead alarmCount={signalRContext.alarmCount} />}
            <Building showClimate={showClimate} />
            <History showHistory={showHistory} />
            <Navbar alarmCount={signalRContext.alarmCount} showClimate={ClimateDisplay} showHistory={HistoryDisplay}></Navbar>
        </>

    );
};

export default App;
