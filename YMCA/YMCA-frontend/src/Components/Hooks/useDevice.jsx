import React, { useContext, useEffect, useState } from "react";
import SignalRContext from "../Contexts/SignalRContext";

const useDevice = (device) => {
    const [currentValue, setCurrentValue] = useState("Inga värden");
    const [isAlarm, setIsAlarm] = useState(false);
    const [metricType, setMetricType] = useState("");

    const signalRContext = useContext(SignalRContext);

    const validateValue = (value) => {
        if (value > device.maxValue || value < device.minValue) {
            setIsAlarm(true);
        }
    };

    useEffect(() => {
        device.metricType == 1
            ? setMetricType("Temperatur")
            : setMetricType("Luftfuktighet");
    }, []);

    useEffect(() => {
        signalRContext.newTelemetry.filter((telemetry) => {
            if (telemetry.deviceId.toLowerCase() == device.id.toLowerCase()) {
                setCurrentValue(telemetry.value);
                validateValue(telemetry.value);
            }
        });
    }, [signalRContext.newTelemetry]);

    const resetAlarm = () => {
        setIsAlarm(false);
    };

    return {
        currentValue,
        isAlarm: isAlarm
        metricType,
        resetAlarm,
    };
};

export default useDevice;
