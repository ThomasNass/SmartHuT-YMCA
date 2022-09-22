import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { negotiate, getAll } from "./js/script.js"
import Device from './Device.jsx';
import MappedDevice from './mapped-device.jsx';



const Connect = (props) => {
    const [connection, setConnection] = useState(null);
    const [telemetry, setTelemetry] = useState([]);
    const [resetId, setResetId] = useState("")
    const devices = props.devices;
    // const latestChat = useRef(null);

    // latestChat.current = chat;

    useEffect(() => {
        (async () => {
            let accessToken;
            let url;
            if (!localStorage.getItem("negotiationData")) {
                const data = await negotiate();
                accessToken = data.accessToken
                url = data.url
                localStorage.setItem("negotiationData", JSON.stringify(data))
            }
            else {
                const data = JSON.parse(localStorage.getItem("negotiationData"));
                console.log(data)
                accessToken = data.accessToken
                url = data.url
            }
            const newConnection = new HubConnectionBuilder()
                .withUrl(url, {
                    accessTokenFactory: () => accessToken
                })
                .withAutomaticReconnect()
                .build();

            setConnection(newConnection);
        })();

    }, []);

    useEffect(() => {
        if (connection) {
            connection.on('newTelemetry', newTelemetry => {
                setTelemetry(...newTelemetry);
            });
            //Alarm restored on device with id 
            connection.on("alarmNeutralized", (msg) => {
                const str = "Alarm restored on device with id "
                const id = msg.split(str).pop().trim().split(" ").shift();
                setResetId(id);
                console.log(id)
                console.log(msg)
            });

            connection.start().catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);



    return (
        <div>
            {devices.map((device) =>
                <MappedDevice device={device} resetId={resetId} key={device.tempId} telemetry={telemetry} />
            )}
            <Device telemetry={telemetry} />
        </div>
    );
};

export default Connect;