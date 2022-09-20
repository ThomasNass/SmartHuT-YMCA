import React, { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const SignalRContext = React.createContext({
    newTelemetry: [],
    alarmNetralized: null,
});

export const SignalRContextProvider = (props) => {
    const [newTelemetry, setNewTelemetry] = useState([]);
    const [alarmNeutralized, setAlarmNeutralized] = useState([]);

    const negotiate = async () => {
        const response = await fetch(
            "https://smarthut.azurewebsites.net/api/negotiate",
            {
                headers: {
                    "X-MS-SIGNALR-USERID": "krki21cn@student.ju.se", // Ska ändras och vara dynamisk sen
                },
            }
        ).catch((error) => console.log(error)); // Bör göra en respons till användaren också

        const data = await response.json();
        return data;
    };

    useEffect(() => {
        (async () => {
            const { accessToken, url } = await negotiate();

            const connection = new HubConnectionBuilder()
                .withUrl(url, {
                    accessTokenFactory: () => accessToken,
                })
                .configureLogging(LogLevel.Trace)
                .build();

            connection.on("newTelemetry", (newTelemetry) => {
                setNewTelemetry(newTelemetry);
                console.log(newTelemetry);
            });

            connection.on("alarmNeutralized", (msg) => console.log(msg));

            connection
                .start()
                .catch((error) => console.error(error.toString()));
        })();
    }, []);

    const contextValue = {
        newTelemetry: newTelemetry,
        alarmNetralized: alarmNeutralized,
    };

    return (
        <SignalRContext.Provider value={contextValue}>
            {props.children}
        </SignalRContext.Provider>
    );
};

export default SignalRContext;
