import React, { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { negotiate } from "../../js/script.js"

const SignalRContext = React.createContext({
    newTelemetry: [],
    alarmNetralized: null,
    adjustAlarmCount: () => { },
    alarmCount: 0,
    resetId: null,
});

export const SignalRContextProvider = (props) => {
    const [newTelemetry, setNewTelemetry] = useState([]);
    const [resetId, setResetId] = useState("");
    const [alarmCount, setAlarmCount] = useState(0);

    const adjustAlarmCount = (isAlarm) => {
        setAlarmCount((counter) => isAlarm ? Math.max(0, ++counter) : Math.max(0, --counter))
    }


    useEffect(() => {
        (async () => {
            let negotiation = await negotiate();
            const connection = new HubConnectionBuilder()
                .withUrl(negotiation.url, {
                    accessTokenFactory: () => negotiation.accessToken,
                })
                .withAutomaticReconnect()
                .build();
            connection
                .start()
                .then(() => {
                    connection.on("newTelemetry", (newTelemetry) => {
                        setNewTelemetry(newTelemetry);
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
