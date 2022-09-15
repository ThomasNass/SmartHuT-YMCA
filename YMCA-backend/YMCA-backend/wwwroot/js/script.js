

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
        let response = await fetch("https://localhost:5000/SmartHut/token");
        let data = await response.text();

        console.log(data);
        return data;
    }
    catch (e) {
        console.log(e)
    }
}

const getDevicesBuilding = async (id, headers) => {
    try {
        let response = await fetch(`https://api.smarthut.se/buildinginfo/${id}/true`, { headers: headers });
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch (e) {
        console.log(e)
    }
}

const getAll = async () => {
    const token = await getToken();

    const headers = {
        "Authorization": `Bearer ${token}`
    }
    const building = await getBuilding(headers);

    const buildingWithDevices = await getDevicesBuilding(building.id, headers)

    console.log(buildingWithDevices)

}

getAll();

// SignalR

const initializeSignalRConnection = (url, accessToken) => {
    console.log(url)
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(url, {
            accessTokenFactory: () => { return accessToken }
,
        })
        .configureLogging(signalR.LogLevel.Trace)
        .build();

    console.log(connection);

   /* connection.on("newTelemetry", (obj) => {
        console.log(obj)
    });

    connection.start().catch(error => console.error(error.toString()));*/

    return connection;
}

const negotiate = async () => {
    const response = await fetch("https://smarthut.azurewebsites.net/api/negotiate",
        {
            headers: {
                'X-MS-SIGNALR-USERID': 'nath21ul@student.ju.se'
            }
        }).catch((error) => console.log(error))

    const data = await response.json();

    return data;
}



const getSignalR = async () => {

    const data = await negotiate();

    const connection = initializeSignalRConnection(data.url, data.accessToken);
    connection.on('newTelemetry', (obj) => { console.log(obj) })
    connection.start()
        
        .catch(error => console.error(error.toString()));

}

getSignalR();