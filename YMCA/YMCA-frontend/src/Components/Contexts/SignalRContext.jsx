import React, { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const SignalRContext = React.createContext({
    newTelemetry: [],
    alarmNetralized: null,
    adjustAlarmCount: () => { },
    alarmCount: 0,
    resetId: null,
});

export const SignalRContextProvider = (props) => {
    const [newTelemetry, setNewTelemetry] = useState([]);
    const [alarmNeutralized, setAlarmNeutralized] = useState([]);
    const [resetId, setResetId] = useState("");
    const [alarmCount, setAlarmCount] = useState(0);

    const adjustAlarmCount = (isAlarm) => {
        setAlarmCount((counter) => isAlarm ? Math.max(0, ++counter) : Math.max(0, --counter))
    }

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

        localStorage.setItem("negotiation", JSON.stringify(data));
        return data;
    };

    useEffect(() => {
        (async () => {
            let negotiation = null;
            if (!localStorage.getItem("negotiation")) {
                negotiation = await negotiate();
            } else {
                negotiation = JSON.parse(localStorage.getItem("negotiation"));
            }
            const connection = new HubConnectionBuilder()
                .withUrl(negotiation.url, {
                    accessTokenFactory: () => negotiation.accessToken,
                })
                .withAutomaticReconnect()
                // .configureLogging(LogLevel.Trace)
                .build();
            connection
                .start()
                .then(() => {
                    connection.on("newTelemetry", (newTelemetry) => {
                        setNewTelemetry(newTelemetry);
                        // console.log(newTelemetry);
                    });
                    connection.on("alarmNeutralized", (msg) => {
                        const str = "Alarm restored on device with id ";
                        const id = msg
                            .split(str)
                            .pop()
                            .trim()
                            .split(" ")
                            .shift();
                        setResetId(id);
                    });
                })
                .catch((error) => console.error(error.toString()));
        })();
    }, []);

    const contextValue = {
        newTelemetry: newTelemetry,
        alarmNetralized: alarmNeutralized,
        adjustAlarmCount: adjustAlarmCount,
        alarmCount: alarmCount,
        resetId: resetId,
    };

    return (
        <SignalRContext.Provider value={contextValue}>
            {props.children}
        </SignalRContext.Provider>
    );
};

export default SignalRContext;
