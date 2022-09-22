import React, { useEffect, useState } from "react";
import Device from "./Device/Device";
import * as styles from "./Room.module.css";

const Room = (props) => {
    const [room, setRoom] = useState({})
    const [devices, setDevices] = useState([]);
    const [isAlarm, setIsAlarm] = useState(false);

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
        setAlarmCounter(0);
        setDevices(props.room.devices);
        setRoom(props.room);
    }, []);

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
                    {isAlarm
                        ? `${props.room.name} LARM!`
                        : `${props.room.name}`}
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
