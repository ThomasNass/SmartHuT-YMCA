import React, { useContext, useEffect, useState } from "react";
import * as classes from "./App.module.css";
import SignalRContext from "./Components/Contexts/SignalRContext";
import useDevice from "./Components/Hooks/useDevice";
import { getBuildingDevices } from "./js/script";
import Device from "./Components/Device";

const App = () => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        (async () => {
            setDevices(await getBuildingDevices());
        })();
    }, []);

    return (
        <>
            <h1 className={classes["header"]}>
                {devices.length > 0 && devices.map((device, key) => (
                    <Device device={device} key={device.id} />
                ))}
            </h1>
        </>
    );
};

export default App;
