import React, { useEffect, useState } from "react";
import Device from "./Device/Device";
import * as styles from "./Room.module.css";
import { IoWarning } from "react-icons/io5";

const Room = (props) => {
    const [room, setRoom] = useState({});
    const [devices, setDevices] = useState([]);
    const [isAlarm, setIsAlarm] = useState(false);
    const [fixedName, setFixedName] = useState('Ej Definierad');

    const onAlarmChangeHandler = (deviceId, isAlarm) => {
        changeDeviceAlarmState(deviceId, isAlarm);
        setIsAlarm(devices.some((device) => device.isAlarm));
    };

    useEffect(() => {
        props.onAlarmChange(room.name, isAlarm);
    }, [isAlarm]);

    useEffect(() => {
        setIsAlarm(devices.some((device) => device.isAlarm));
    }, [devices]);

    useEffect(() => {
        setIsAlarm(room.isAlarm);
        setDevices(props.room.devices);
        setRoom(props.room);
    }, []);

    useEffect(() => {
        switch (room.name) {
            case "Conference room 1":
                setFixedName("Konferensrum 1");
                break;
            case "Conference room 2":
                setFixedName("Konferensrum 2");
                break;
            case "Conference room 3":
                setFixedName("Konferensrum 3");
                break;
            case "swimming pool 1":
                setFixedName("Pool");
                break;
            default:
                setFixedName("N/A");
                break;
        }
    }, [room]);

    const changeDeviceAlarmState = (deviceId, newIsAlarm) => {
        setDevices((prevDevices) =>
            prevDevices.map((d) => {
                if (deviceId == d.id) {
                    return { ...d, isAlarm: newIsAlarm };
                }

                return d;
            })
        );
    };


    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.header}>
                    {fixedName}
                    {isAlarm && <IoWarning className={styles.icon} />}
                </h1>
                <div className={styles.devices}>
                    {props.room &&
                        devices.map((device, key) => {
                            return (
                                <Device
                                    onAlarmChange={onAlarmChangeHandler}
                                    device={device}
                                    key={key}
                                />
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default Room;
