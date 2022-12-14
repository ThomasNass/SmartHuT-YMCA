import React, { useEffect, useState } from "react";
import { HistoryDisplay, HistoryDisplay } from "./HistoryDisplay";
import { getAll, getToken } from "../../js/script.js";
import styles from "./history.module.css";

const History = (props) => {
    const [roomOneTemp, setroomOneTemp] = useState([]);
    const [roomTwoTemp, setroomTwoTemp] = useState([]);
    const [roomTwoHum, setroomTwoHum] = useState([]);
    const [roomThreeTemp, setroomThreeTemp] = useState([]);
    const [roomThreeHum, setroomThreeHum] = useState([]);
    const [poolTemp, setPoolTemp] = useState([]);

    const GetTheLog = async (deviceId, token) => {
        try {
            let response = await fetch(
                `https://api.smarthut.se/DeviceInfo/GetAlarmLogs/${deviceId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            let data = await response.json();
            return data;
        } catch (e) {
            console.log(e);
        }
    };

    // because of async I moved them inside use Effect
    useEffect(() => {
        const GetHistoryForRoom = async () => {
            let buildingWDevices = await getAll();
            let devicesInRoom = buildingWDevices.devices;
            let token = await getToken();
            for (let i = 0; i < devicesInRoom.length; i++) {
                let historyInfo = await GetTheLog(devicesInRoom[i].id, token);
                for (let j = 0; j < historyInfo.length; j++) {
                    if (devicesInRoom[i].id == historyInfo[j].deviceId && historyInfo[j].state) {
                        var date = new Date(historyInfo[j].timeStamp);
                        justTime =
                            "Kl:" +
                            date.getHours() +
                            ":" +
                            date.getMinutes() +
                            ":" +
                            date.getSeconds() +
                            " ";
                        if (
                            devicesInRoom[i].name.includes(
                                "Temperature Conference room 1"
                            )
                        ) {
                            roomOneTemp.push(justTime);
                        }
                        if (
                            devicesInRoom[i].name.includes(
                                "Temperature Conference room 2"
                            )
                        ) {
                            roomTwoTemp.push(justTime);
                        }
                        if (
                            devicesInRoom[i].name.includes(
                                "Humidity Conference room 2"
                            )
                        ) {
                            roomTwoHum.push(justTime);
                        }
                        if (
                            devicesInRoom[i].name.includes(
                                "Temperature Conference room 3"
                            )
                        ) {
                            roomThreeTemp.push(justTime);
                        }
                        if (
                            devicesInRoom[i].name.includes(
                                "Humidity Conference room 3"
                            )
                        ) {
                            roomThreeHum.push(justTime);
                        }
                        if (
                            devicesInRoom[i].name.includes(
                                "Temperature swimming pool 1"
                            )
                        ) {
                            poolTemp.push(justTime);
                        }
                    }
                }
            }
            const listRoomOneTemp = roomOneTemp
                .map((time) => <span key={time}>{time}</span>)
                .slice(0, 10)
                .sort();
            setroomOneTemp((roomOneTemp) => [...roomOneTemp, listRoomOneTemp]);
            const listRoomTwoTemp = roomTwoTemp
                .map((time) => <span key={time}>{time}</span>)
                .sort();
            setroomTwoTemp((roomTwoTemp) => [...roomTwoTemp, listRoomTwoTemp]);
            const listRoomTwoHum = roomTwoHum
                .map((time) => <span key={time}>{time}</span>)
                .sort();
            setroomTwoHum((roomTwoHum) => [...roomTwoHum, listRoomTwoHum]);

            const listRoomThreeTemp = roomThreeTemp
                .map((time) => <span key={time}>{time}</span>)
                .sort();
            setroomThreeTemp((roomThreeTemp) => [
                ...roomThreeTemp,
                listRoomThreeTemp,
            ]);
            const listRoomThreeHum = roomThreeHum
                .map((time) => <span key={time}>{time}</span>)
                .sort();
            setroomThreeHum((roomThreeHum) => [
                ...roomThreeHum,
                listRoomThreeHum,
            ]);

            const listPoolTemp = poolTemp
                .map((time) => <span key={time}>{time}</span>)
                .sort();
            setPoolTemp((poolTemp) => [...poolTemp, listPoolTemp]);
        };
        GetHistoryForRoom();
    }, []);

    return (
        <div>
            <HistoryDisplay
                room={"Konferensrum 1"}
                Temp={roomOneTemp.slice(0, 10)}
                Hum={null}
            />
            <HistoryDisplay
                room={"Konferensrum 2"}
                Temp={roomTwoTemp.slice(0, 10)}
                Hum={roomTwoHum.slice(0, 10)}
            />
            <HistoryDisplay
                room={"Konferensrum 3"}
                Temp={roomThreeTemp.slice(0, 10)}
                Hum={roomThreeHum.slice(0, 10)}
            />
            <HistoryDisplay
                room={"Pool"}
                Temp={poolTemp.slice(0, 10)}
                Hum={null}
            />
        </div>
    );
};

export default History;
