import React, { useEffect, useContext } from "react";
import * as classes from "./App.module.css";
import Building from "./Components/Building/Building";
import SignalRContext from "./Components/Contexts/SignalRContext";

const App = () => {
    const signalRContext = useContext(SignalRContext);

    const header =
        signalRContext.alarmCount > 0
            ? `Antal Larm: ${signalRContext.alarmCount}`
            : "Inga Larm";

    return (
        <>
            <h1 className={classes["header"]}>{header}</h1>
            <Building />
        </>
    );
};

export default App;
