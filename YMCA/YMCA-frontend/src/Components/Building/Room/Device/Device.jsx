import React, { useEffect } from "react";
import useDevice from "../../../Hooks/useDevice";
import * as styles from "./Device.module.css";
import { IoWarning } from "react-icons/io5";

const Device = (props) => {
    const {
        currentValue: currentValue,
        isAlarm: isAlarm,
        resetAlarm: resetAlarm,
        metricType,
        unit,
        testAlarm,
        status
    } = useDevice(props.device);

    useEffect(() => {
        props.onAlarmChange(props.device.id, isAlarm);
    }, [isAlarm]);

    return (
        <div className={styles.container}>
            <p className={styles.paragraph}>
                {metricType}: {currentValue}
                {unit.unit}
            </p>
            {isAlarm && (
                <div className={styles.wrapper}>
                    {status}
                    <IoWarning className={styles.icon} />
                </div>
            )}
            {isAlarm && (
                <div className={styles.options}>
                    <button className={styles.button} onClick={resetAlarm}>
                        Återställ
                    </button>
                </div>
            )}
        </div>
    );
};

export default Device;
