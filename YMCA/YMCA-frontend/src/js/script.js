import formattedData from "./sort-devices-by-room.js"

const localHost = `${window.location.protocol}//${window.location.host}`;

export const getUser = async () => {
    try {
        const response = await fetch(`${localHost}/User`);
        const data = await response.json();

        status401Redirect(response);

        return data;
    }
    catch (e) {
        console.log(e);
    }
}

export const status401Redirect = (response) => {
    if (response.status == 401) {
        window.location = `${localHost}/user/signout/`;
    }
}

export const getUnit = async (id) => {
    try {
        const token = await getToken();

        const headers = {
            "Authorization": `Bearer ${token}`
        }

        const response = await fetch("https://api.smarthut.se/Unit/", { headers });

        status401Redirect(response);

        const data = await response.json();
        return data.find((unit) => unit.id.toLowerCase() === id.toLowerCase());
    }
    catch (e) {
        console.log(e);
    }
}

const getBuilding = async (headers) => {
    try {
        let response = await fetch("https://api.smarthut.se/buildinginfo/getmybuilding", { headers: headers });
        
        status401Redirect(response);
        
        let data = await response.json();
        return data;
    }
    catch (e) {
        console.log(e);
    }
}

export const getToken = async () => {
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

        status401Redirect(response);

        return data;
    }
    catch (e) {
        console.log(e);
    }
}

export const getAll = async () => {
    const token = await getToken();

    const headers = {
        "Authorization": `Bearer ${token}`
    }
    const building = await getBuilding(headers);

    const buildingWithDevices = await getDevicesBuilding(building.id, headers)

    return buildingWithDevices
}

export const getBuildingDevices = async () => {
    const token = await getToken();

    const headers = {
        "Authorization": `Bearer ${token}`
    }

    const building = await getBuilding(headers);

    try {

        let response = await fetch(`https://api.smarthut.se/DeviceInfo/GetBuildingDevices/${building.id}`, { headers });

        status401Redirect(response);

        let data = await response.json();
        return data;
    }
    catch (e) {
        return e;
    }
}


export const getAlarmLogs = async (id) => {
    const token = await getToken();
    const headers = {
        "Authorization": `Bearer ${token}`
    }

    const response = await fetch(`https://api.smarthut.se/DeviceInfo/GetAlarmLogs/${id}`, { headers: headers })

    status401Redirect(response);

    const data = await response.json();
    return data[0].state;
}

// SignalR

export const negotiate = async () => {
    const user = await getUser();

    const response = await fetch("https://smarthut.azurewebsites.net/api/negotiate",
        {
            headers: {
                'X-MS-SIGNALR-USERID': user.email
            }
        }).catch((error) => console.log(error))
    
    status401Redirect(response);

    const data = await response.json();

    return data;
}