import React, { useEffect, useContext, useState } from "react";
import Head from "./Components/Bars/Head/Head";
import SignalRContext from "./Components/Contexts/SignalRContext";
import Content from "./Components/Content/Content";
import Navbar from "./Components/Bars/Navbar/Navbar";
import { Observer } from "./Components/Observer";

const App = () => {
    const signalRContext = useContext(SignalRContext);
    const [showClimate, setShowClimate] = useState(true);

    const showClimateHandle = (showClimate) => {
        setShowClimate(showClimate);
    };

    return (
        <>
            <Head alarmCount={signalRContext.alarmCount} />
            <Observer/>
            <Content showClimate={showClimate} />
            <Navbar
                alarmCount={signalRContext.alarmCount}
                showClimateHandler={showClimateHandle}
            />
            
        </>
    );
};

export default App;
