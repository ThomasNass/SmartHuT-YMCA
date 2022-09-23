import React, { useContext, useEffect, useState } from "react";
import { getAlarmLogs, getUnit } from "../../js/script";
import SignalRContext from "../Contexts/SignalRContext";

const useDevice = (device) => {
    const [currentValue, setCurrentValue] = useState("Inga värden");
    const [isAlarm, setIsAlarm] = useState(false);
    const [metricType, setMetricType] = useState("");
    const [unit, setUnit] = useState({});
    const [status, setStatus] = useState('FÖR HÖG');

    const signalRContext = useContext(SignalRContext);

    const validateValue = (value) => {
        if (value > device.maxValue) {
            setIsAlarm(true);
            setStatus("FÖR HÖG");
        }
        else if (value < device.minValue) {
            setIsAlarm(true);
            setStatus("FÖR LÅG");
        }
    };

    useEffect(() => {
        (async () => {
            device.metricType == 1
                ? setMetricType("Temperatur")
                : setMetricType("Luftfuktighet");

            const humidityState = await getAlarmLogs(device.id);
            setIsAlarm(humidityState);

            (async () => {
                setUnit(await getUnit(device.unitId));
            })();
        })();
    }, []);

    useEffect(() => {
        signalRContext.newTelemetry.filter((telemetry) => {
            if (telemetry.deviceId.toLowerCase() == device.id.toLowerCase()) {
                setCurrentValue(Math.round(telemetry.value * 10) / 10);
                validateValue(telemetry.value);
            }
        });
    }, [signalRContext.newTelemetry]);

    const resetAlarm = async () => {
        const response = await fetch(
            "https://smarthut.azurewebsites.net/api/restorealarm",
            {
                method: "POST",
                body: JSON.stringify({
                    deviceId: device.id,
                    userName: "krki21cn@student.ju.se",
                }),
            }
        );
        const data = response;
        setIsAlarm(false);
        console.log(data);
        return data;
    };

    useEffect(() => {
        signalRContext.adjustAlarmCount(isAlarm);
    }, [isAlarm])

    useEffect(() => {
        device.id.toLowerCase() === signalRContext.resetId.toLowerCase()
            ? setIsAlarm(false)
            : isAlarm;
    }, [signalRContext.resetId]);

    const testAlarm = () => {
        setIsAlarm(true);
    };

    return {
        currentValue,
        isAlarm: isAlarm,
        metricType,
        resetAlarm,
        unit,
        testAlarm,
    };
};

export default useDevice;
