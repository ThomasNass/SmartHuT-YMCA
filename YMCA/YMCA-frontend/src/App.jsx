import React, { useEffect, useContext, useState } from "react";
import Navbar from "./Components/Bars/Navbar/Navbar";
import Head from "./Components/Bars/Head/Head";
import SignalRContext from "./Components/Contexts/SignalRContext";
import Content from "./Components/Content/Content.jsx";

const App = () => {
    const signalRContext = useContext(SignalRContext);
    const [showClimate, setShowClimate] = useState(true);

    const showClimateHandle = (showClimate) => {
        setShowClimate(showClimate);
    };

    return (
        <>
            <Head alarmCount={signalRContext.alarmCount} />
            <Content showClimate={showClimate} />
            <Navbar
                alarmCount={signalRContext.alarmCount}
                showClimateHandler={showClimateHandle}
            />
        </>
    );
};

export default App;
