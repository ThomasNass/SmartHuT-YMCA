import React, { useState, useEffect } from "react";
import { restoreAlarm, getAlarmLogs } from "./js/script.js";

const MappedDevice = (props) => {

    const telemetry = props.telemetry
    const tempMin = props.device.tempMin;
    const tempMax = props.device.tempMax;
    const humidityMax = props.device.humidityMax;
    const humidityMin = props.device.humidityMin;
    const [tempAlarm, setTempAlarm] = useState(false)
    const [humidityAlarm, setHumidityAlarm] = useState(false)
    const [tempValue, setTempValue] = useState()
    const [humidityValue, setHumidityValue] = useState();

    useEffect(() => {
        (async () => {
            const tempState = await getAlarmLogs(props.device.tempId);
            setTempAlarm(tempState)
            if (props.device.humidityId != undefined) {
                const humidityState = await getAlarmLogs(props.device.humidityId);
                setHumidityAlarm(humidityState)
            }
        })();
    }, [])

    useEffect(() => {
        let deviceId = telemetry.deviceId

        if (deviceId != undefined) {
            if (deviceId.toLowerCase() == props.device.tempId) {
                const rounded = Math.round(telemetry.value * 10) / 10
                setTempValue(rounded)
            }
            if (deviceId.toLowerCase() == props.device.humidityId) {
                const rounded = Math.round(telemetry.value * 10) / 10
                setHumidityValue(rounded)
            }
        }
        resetAlarm(props.resetId);
        checkTemp();

    }, [telemetry])

    function checkTemp() {
        if (tempValue < tempMin || tempMax < tempValue) {
            setTempAlarm(true)
        }

        if (humidityValue < humidityMin || humidityMax < humidityValue) {
            setHumidityAlarm(true)
        }


    }

    function onClick(e) {
        if (e.target.value == "temp") {
            restoreAlarm(props.device.tempId)
            setTempAlarm(false)

        }
        if (e.target.value == "humidity") {
            restoreAlarm(props.device.humidityId)
            setHumidityAlarm(false)


        }
        checkTemp()
    }

    function resetAlarm(id) {
        if (id == props.device.tempId) {
            setTempAlarm(false)
        }
        if (id == props.device.humidityId) {
            setHumidityAlarm(false)
        }
    }


    return <div className='device'>
        <p>{props.device.name}</p>
        <div className='device-data'>
            <div className='data-div'> <p>Temperatur</p>
                <p>{tempValue}°C</p>
                {(tempAlarm) ?
                    <div className='alert-div'>{(tempMax < tempValue) ? "FÖR HÖGT" : "FÖR LÅGT"}
                        <button className='alert-button' value={"temp"} onClick={onClick}> Återställ
                        </button>
                    </div>
                    :
                    null
                }
            </div>
            {(props.device.humidityId != undefined) ?
                <>
                    <div className='data-div'>
                        <p>Luftfuktighet </p>
                        <p>{humidityValue}%</p>
                        {(humidityAlarm) ?
                            <div className='alert-div'>{(humidityMax < humidityValue) ? "FÖR HÖGT" : "FÖR LÅGT"}<button className='alert-button' value={"humidity"} name={"high"} onClick={onClick}> Återställ
                            </button>
                            </div>
                            :
                            null
                        }
                    </div>
                </>
                :
                null
            }
        </div>
    </div>;

    // return <div>
    //     <p>Temperatur: {tempValue}</p>
    //     {(props.device.humidityId != undefined)
    //         ?
    //         <p>Luftfuktighet: {humidityValue}
    //         </p>
    //         : null}


    // </div>

}

export default MappedDevice;