let headers = {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJhcGk6Ly85NTdmZWU0Ny1kNzVhLTRmMjEtYTA3My1mNjg4MTUwNjE4MDkiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC85YmZhMTcwNi0xZmZjLTQ5NGQtYTYzZS1kYmJiMzRjNDc5NmIvIiwiaWF0IjoxNjYzMTM3OTQzLCJuYmYiOjE2NjMxMzc5NDMsImV4cCI6MTY2MzE0MjYxNCwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhUQUFBQVR1U0piWnZ4UlhzZ1JreEU5WGJqeWVIeVhranhuWEJtYVlaa1FOYWRuVTNEYmlHWkNFaUFGTTJHeWdSSFBWc0FCNXI0cXVRYmhKT3k3YXRFaytETWxBPT0iLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiYmJjMTI5NTItZWM3Ny00NzRkLWIxY2MtYmJkYjgzZDI4MDhmIiwiYXBwaWRhY3IiOiIwIiwiZW1haWwiOiJuYXRoMjF1bEBzdHVkZW50Lmp1LnNlIiwiZmFtaWx5X25hbWUiOiJOw6RzcyIsImdpdmVuX25hbWUiOiJUaG9tYXMiLCJncm91cHMiOlsiN2I4NGRiOWMtMmRhNy00YjZmLThjMjEtMDQ2ZTg0MGUzYjg4Il0sImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0Lzc1NjRiYzhmLTM3MzgtNGI0ZC1iZDU3LTVhMDJjYTYyMTVmYi8iLCJpcGFkZHIiOiI3OC42Ni40My4yMDEiLCJuYW1lIjoiVGhvbWFzIE7DpHNzIiwib2lkIjoiMzBmMzdjMDQtMzRhZC00Mzg4LTgyM2MtMDgxOWU4MjgyYTUyIiwicmgiOiIwLkFWOEFCaGY2bV93ZlRVbW1QdHU3Tk1SNWEwZnVmNVZhMXlGUG9IUDJpQlVHR0FsZkFLZy4iLCJzY3AiOiJhY2Nlc3NfYXNfYV91c2VyIiwic3ViIjoicU1nLV84Vk8xMC1WZDZPMkxYSllvZFlYbGU2bklQcUN0bEEyMFVSZE1ROCIsInRpZCI6IjliZmExNzA2LTFmZmMtNDk0ZC1hNjNlLWRiYmIzNGM0Nzk2YiIsInVuaXF1ZV9uYW1lIjoibmF0aDIxdWxAc3R1ZGVudC5qdS5zZSIsInV0aSI6Ilg3MW9tNkNoUEVhRmhmQlNEZG93QUEiLCJ2ZXIiOiIxLjAifQ.VM1OkF2sk531lfy3oBwZw52hE8q6LuBSGs03ZKpirBQT95rFUzuAs1AzyKxprvyWRifNLKVQGg6do7uWPUFjgoL_jt_Wk9PX1Ko2L7xKFC7FJf4uugzqNc9ufrkykmQ0yTDgrDYbZ1n2duv0fxy63uC6j1b_yA5t1db7HDcXG8YO5k4s8u2WA1_2tU2tdtZ1j3VPliVZZDwVSRsKe4UGcj_KGz31YAd2ahAFgOj1xGOOHkUURAlaR9qc3gtk_OhMzORDeGtYbFeKamHOtC8F1Yj3wKG-_EOet6FxFPzR2YOL16kDjBzRt7j1F0A1mzdZsVdAVaspRuxpsvax2YBIkw"
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

//getAll();

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

    console.log("Hej..................................................");

    connection.on("newTelemetry", () => {
        console.log("Hej..................................................");
    });

    connection.start().catch(error => console.error(error.toString()));

    return connection;
}

const negotiate = async () => {
    const response = await fetch("https://smarthut.azurewebsites.net/api/negotiate",
        {
            headers: {
                'X-MS-SIGNALR-USERID': 'krki21cn@student.ju.'
            }
        }).catch((error) => console.log(error))

    const data = await response.json();

    initializeSignalRConnection(data.url, data.accessToken);
}


negotiate();