﻿import formattedData from "./sort-devices-by-room.js"
import { signalR, HubConnectionBuilder } from "@microsoft/signalr"

const localHost = `${window.location.protocol}//${window.location.host}`;


const getUser = async () => {
    try {
        const response = await fetch(`${localHost}/User`);
        const data = await response.json();

        return data;
    }
    catch (e) {
        console.error(e)
    }
}

const getBuilding = async (headers) => {
    try {
        let response = await fetch("https://api.smarthut.se/buildinginfo/getmybuilding", { headers: headers });
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch (e) {
        console.log(e)
    }
}

const getToken = async () => {
    try {
        let user = await getUser();

        return user.token;
    }
    catch (e) {
        console.log(e)
    }
}

const getDevicesBuilding = async (id, headers) => {
    try {
        let response = await fetch(`https://api.smarthut.se/buildinginfo/${id}/true`, { headers: headers });
        let data = await response.json();

        return data;
    }
    catch (e) {
        console.log(e)
    }
}

export const getAll = async () => {
    const token = await getToken();

    const headers = {
        "Authorization": `Bearer ${token}`
    }
    const building = await getBuilding(headers);

    const buildingWithDevices = await getDevicesBuilding(building.id, headers)

    const sorted = formattedData(buildingWithDevices);

    console.log(sorted)
    console.log(buildingWithDevices)
    return sorted;

}

// getAll();

// SignalR


export const restoreAlarm = async (deviceId) => {
    const response = await fetch("https://smarthut.azurewebsites.net/api/restorealarm", {
        method: 'POST',
        body: JSON.stringify({
            "deviceId": deviceId,   // Send deviceId from another component via props.
            "userName": "nath21ul@student.ju.se"                // Get email from getUser() function 
        })
    })
    const data = response;
    console.log(data)
    return data;
}

const initializeSignalRConnection = async (accessToken, url) => {
    const connection = new HubConnectionBuilder()
        .withUrl(url, {
            accessTokenFactory: () => accessToken
        })
        .build();

    return connection;
}

export const negotiate = async () => {
    const user = await getUser();

    const response = await fetch("https://smarthut.azurewebsites.net/api/negotiate",
        {
            headers: {
                'X-MS-SIGNALR-USERID': user.email
            }
        }).catch((error) => console.log(error))

    const data = await response.json();

    return data;
}

export const startSignalR = async () => {
    const { accessToken, url } = await negotiate();

    const connection = await initializeSignalRConnection(accessToken, url);

    connection.on("newTelemetry", (array) => console.log(array))

    connection.on("alarmNeutralized", (msg) => console.log(msg));

    connection.start().catch((error) => console.error(error.toString()));
}

//startSignalR();
