import React from "react";
import Device from "./Device/Device";
import * as styles from "./Room.module.css";

const Room = (props) => {
    const onAlarmChangeHandler = (isAlarm) => {
        props.room.isAlarm = isAlarm
        props.onAlarmChange(props.room);
    };

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.header}>
                    {props.room.isAlarm
                        ? `${props.room.name} LARM!`
                        : `${props.room.name}`}
                </h1>
                <div className={styles.devices}>
                    {props.room &&
                        props.room.devices.map((device, key) => {
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
