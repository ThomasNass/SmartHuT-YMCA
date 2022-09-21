import React, { useEffect } from "react";
import useDevice from "../../../Hooks/useDevice";
import * as styles from "./Device.module.css";

const Device = (props) => {
    const {
        currentValue: currentValue,
        isAlarm: isAlarm,
        resetAlarm: resetAlarm,
        metricType,
        unit,
        testAlarm,
    } = useDevice(props.device);

    useEffect(() => {
        props.onAlarmChange(isAlarm);
    }, [isAlarm])

    return (
        <div>
            <h2>{metricType}</h2>
            <p>
                Nuvarande värde: {currentValue}
                {unit.unit}
            </p>
            {isAlarm && <button onClick={resetAlarm}>Återställ</button>}
            <button onClick={testAlarm}>Testa larm</button>
        </div>
    );
};

export default Device;
