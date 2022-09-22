import React, { useEffect, useState } from 'react';
import { HistoryDisplay, HistoryDisplay } from './HistoryDisplay';


export const History = (props) => {
    let [roomOneTemp, setroomOneTemp] = useState([])
    let [roomTwoTemp, setroomTwoTemp] = useState([])
    let [roomTwoHum, setroomTwoHum] = useState([])
    let [roomThreeTemp, setroomThreeTemp] = useState([])
    let [roomThreeHum, setroomThreeHum] = useState([])
    let [poolTemp, setPoolTemp] = useState([])

    const getDevicesBuilding = async (token) => {
        try {
            let response = await fetch(`https://api.smarthut.se/buildinginfo/55350997-9be4-4746-b94d-3b9fad7ea795/true`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            let data = await response.json();
            return data.devices;
        }
        catch (e) {
            console.log(e)
        }
    }

    const GetTheLog = async (deviceId, token) => {
        try {
            let response = await fetch(`https://api.smarthut.se/DeviceInfo/GetAlarmLogs/${deviceId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            let data = await response.json();;
            return data;
        }
        catch (e) {
            console.log(e)
        }
    }

    // because of async I moved them inside use Effect
    useEffect(() => {
        const GetHistoryForRoom = async () => {
            let devicesInRoom = await getDevicesBuilding("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJiYmMxMjk1Mi1lYzc3LTQ3NGQtYjFjYy1iYmRiODNkMjgwOGYiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOWJmYTE3MDYtMWZmYy00OTRkLWE2M2UtZGJiYjM0YzQ3OTZiL3YyLjAiLCJpYXQiOjE2NjM4NDg5MTUsIm5iZiI6MTY2Mzg0ODkxNSwiZXhwIjoxNjYzODUyODE1LCJhaW8iOiJBVlFBcS84VEFBQUF0SGQ0Z0I4VVpRdEE5Q2JEVTVwRDRycm1UeGRZY2cvWUJ3ME1jQmJWandKSkYxendzRkIrMkxFMmhtWTN2cU9zcXAwakNQc0kxdkFIKzRzTVJ1aFo1SExXQk5FaEVQRDVmUE0zRTVFVkFMUT0iLCJlbWFpbCI6ImFscmEyMXlnQHN0dWRlbnQuanUuc2UiLCJncm91cHMiOlsiN2I4NGRiOWMtMmRhNy00YjZmLThjMjEtMDQ2ZTg0MGUzYjg4Il0sImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0Lzc1NjRiYzhmLTM3MzgtNGI0ZC1iZDU3LTVhMDJjYTYyMTVmYi8iLCJuYW1lIjoiUmFtaSBBbHFhbmJhciIsIm5vbmNlIjoiNjM3OTk0NDU5ODY2NDY5MTgyLllUZzJZamczWm1FdE5UUTRZUzAwWVRGa0xUbGhaRFl0TmpJeVl6SmxPVEkxTm1FNVl6UmhNamxpTlRRdE5UTXlNeTAwTWpCaUxUazNaV0l0TkdOa01EQmhNREkyWldJNCIsIm9pZCI6IjE2ZjU3MjlmLWNhMGItNDgzNC05MzZjLTc3MDIzN2RkMjZmYyIsInByZWZlcnJlZF91c2VybmFtZSI6ImFscmEyMXlnQHN0dWRlbnQuanUuc2UiLCJyaCI6IjAuQVY4QUJoZjZtX3dmVFVtbVB0dTdOTVI1YTFJcHdidDM3RTFIc2N5NzI0UFNnSTlmQUJjLiIsInN1YiI6InBHTGVHelMtTEJWUGxPX2lseHFsNzdvLXlZWkFHWi1HemVmY3IyYVdJNmciLCJ0aWQiOiI5YmZhMTcwNi0xZmZjLTQ5NGQtYTYzZS1kYmJiMzRjNDc5NmIiLCJ1dGkiOiJjWEYtUjU4MFNrVzlKQkU5eFQwUEFBIiwidmVyIjoiMi4wIn0.TTCxyifWSBoq0Sf5HuHjEErAIwlhotkErEtVMrRm8l9XHsEahLyOeQNdemkqeONwE1sNQ8_PiDzkfQHXm9_b_eJ8XuefYqEYaUdUqtzvIgIuTTQaFfMbx4nmgpq6Rgj_bY2GMM-BSXj69hBcYv92ujlod9c7fkbgHe6Gh5Agd99efEEQPBII89nAyYE2yQJjHsscp3MRfdWK2eb071eV_ko0X8NiSEBGhznwtm2a2IkPKIotePkiViD0VyFNwjx8e457RFADgZOlfVCWbL_eyI2SAJ84CVML4O3VdRfjSOGECdhSaVH0MCqnrl2idCyI0HMTPxAEgV8d8lnOHPc6Zg")
            for (let i = 0; i < devicesInRoom.length; i++) {
                let historyInfo = await GetTheLog(devicesInRoom[i].id, "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJiYmMxMjk1Mi1lYzc3LTQ3NGQtYjFjYy1iYmRiODNkMjgwOGYiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOWJmYTE3MDYtMWZmYy00OTRkLWE2M2UtZGJiYjM0YzQ3OTZiL3YyLjAiLCJpYXQiOjE2NjM4NDg5MTUsIm5iZiI6MTY2Mzg0ODkxNSwiZXhwIjoxNjYzODUyODE1LCJhaW8iOiJBVlFBcS84VEFBQUF0SGQ0Z0I4VVpRdEE5Q2JEVTVwRDRycm1UeGRZY2cvWUJ3ME1jQmJWandKSkYxendzRkIrMkxFMmhtWTN2cU9zcXAwakNQc0kxdkFIKzRzTVJ1aFo1SExXQk5FaEVQRDVmUE0zRTVFVkFMUT0iLCJlbWFpbCI6ImFscmEyMXlnQHN0dWRlbnQuanUuc2UiLCJncm91cHMiOlsiN2I4NGRiOWMtMmRhNy00YjZmLThjMjEtMDQ2ZTg0MGUzYjg4Il0sImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0Lzc1NjRiYzhmLTM3MzgtNGI0ZC1iZDU3LTVhMDJjYTYyMTVmYi8iLCJuYW1lIjoiUmFtaSBBbHFhbmJhciIsIm5vbmNlIjoiNjM3OTk0NDU5ODY2NDY5MTgyLllUZzJZamczWm1FdE5UUTRZUzAwWVRGa0xUbGhaRFl0TmpJeVl6SmxPVEkxTm1FNVl6UmhNamxpTlRRdE5UTXlNeTAwTWpCaUxUazNaV0l0TkdOa01EQmhNREkyWldJNCIsIm9pZCI6IjE2ZjU3MjlmLWNhMGItNDgzNC05MzZjLTc3MDIzN2RkMjZmYyIsInByZWZlcnJlZF91c2VybmFtZSI6ImFscmEyMXlnQHN0dWRlbnQuanUuc2UiLCJyaCI6IjAuQVY4QUJoZjZtX3dmVFVtbVB0dTdOTVI1YTFJcHdidDM3RTFIc2N5NzI0UFNnSTlmQUJjLiIsInN1YiI6InBHTGVHelMtTEJWUGxPX2lseHFsNzdvLXlZWkFHWi1HemVmY3IyYVdJNmciLCJ0aWQiOiI5YmZhMTcwNi0xZmZjLTQ5NGQtYTYzZS1kYmJiMzRjNDc5NmIiLCJ1dGkiOiJjWEYtUjU4MFNrVzlKQkU5eFQwUEFBIiwidmVyIjoiMi4wIn0.TTCxyifWSBoq0Sf5HuHjEErAIwlhotkErEtVMrRm8l9XHsEahLyOeQNdemkqeONwE1sNQ8_PiDzkfQHXm9_b_eJ8XuefYqEYaUdUqtzvIgIuTTQaFfMbx4nmgpq6Rgj_bY2GMM-BSXj69hBcYv92ujlod9c7fkbgHe6Gh5Agd99efEEQPBII89nAyYE2yQJjHsscp3MRfdWK2eb071eV_ko0X8NiSEBGhznwtm2a2IkPKIotePkiViD0VyFNwjx8e457RFADgZOlfVCWbL_eyI2SAJ84CVML4O3VdRfjSOGECdhSaVH0MCqnrl2idCyI0HMTPxAEgV8d8lnOHPc6Zg")
                for (let j = 0; j < historyInfo.length; j++) {
                    if (devicesInRoom[i].id == historyInfo[j].deviceId) {
                        var date = new Date(historyInfo[j].timeStamp);
                        justTime = "Kl:" + date.getHours()+":"+date.getMinutes()+":"+date.getSeconds() + " ";          
                        if (devicesInRoom[i].name.includes("Temperature Conference room 1")) {
                            roomOneTemp.push(justTime)
                        }
                        if (devicesInRoom[i].name.includes("Temperature Conference room 2")) {
                            roomTwoTemp.push(justTime)
                        }
                        if (devicesInRoom[i].name.includes("Humidity Conference room 2")) {
                            roomTwoHum.push(justTime)
                        }
                        if (devicesInRoom[i].name.includes("Temperature Conference room 3")) {
                            roomThreeTemp.push(justTime)
                        }
                        if (devicesInRoom[i].name.includes("Humidity Conference room 3")) {
                            roomThreeHum.push(justTime)
                        }
                        if (devicesInRoom[i].name.includes("Temperature swimming pool 1")) {
                            poolTemp.push(justTime)
                        }
                    }
                    
                }
            }
            const listRoomOneTemp = roomOneTemp.map((time) =>
            <span>{time}</span>
            ).slice(0,10).sort()
            setroomOneTemp(roomOneTemp => [...roomOneTemp, listRoomOneTemp]);
            const listRoomTwoTemp = roomTwoTemp.map((time) =>
            <span>{time}</span>
            ).sort()
            setroomTwoTemp(roomTwoTemp => [...roomTwoTemp, listRoomTwoTemp]);
            const listRoomTwoHum = roomTwoHum.map((time) =>
            <span>{time}</span> 
            ).sort()
            setroomTwoHum(roomTwoHum => [...roomTwoHum, listRoomTwoHum]);

            const listRoomThreeTemp = roomThreeTemp.map((time) =>
            <span>{time}</span>
            ).sort()
            setroomThreeTemp(roomThreeTemp => [...roomThreeTemp, listRoomThreeTemp]);
            const listRoomThreeHum = roomThreeHum.map((time) =>
            <span>{time}</span>
            ).sort()
            setroomThreeHum(roomThreeHum => [...roomThreeHum, listRoomThreeHum]);

            const listPoolTemp = poolTemp.map((time) =>
            <span>{time}</span>
            ).sort()
            setPoolTemp(poolTemp => [...poolTemp, listPoolTemp]);           
        }
        GetHistoryForRoom();
    }, []);



    return (
        <div>
        <HistoryDisplay room={"Konferensrum 1"} Temp={roomOneTemp.slice(0,10)} Hum={null} />
        <HistoryDisplay room={"Konferensrum 2"} Temp={roomTwoTemp.slice(0,10)} Hum={roomTwoHum.slice(0,10)}/>
        <HistoryDisplay room={"Konferensrum 3"} Temp={roomThreeTemp.slice(0,10)} Hum={roomThreeHum.slice(0,10)}/>
        <HistoryDisplay room={"Pool"} Temp={poolTemp.slice(0,10)} Hum={null} />
        </div>     
      
    )

}
