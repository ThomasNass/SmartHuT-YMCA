import React, { useState, useEffect } from "react";
import { restoreAlarm } from "./js/script.js";

const MappedDevice = (props) => {

    const telemetry = props.telemetry
    const tempMin = props.device.tempMin;
    const tempMax = props.device.tempMax;
    const humidityMax = props.device.humidityMax;
    const humidityMin = props.device.humidityMin;
    const [tempTooLow, setTempTooLow] = useState(false)
    const [tempTooHigh, setTempTooHigh] = useState(false)
    const [humidityTooLow, setHumidityTooLow] = useState(false)
    const [humidityTooHigh, setHumidityTooHigh] = useState(false)
    const [tempValue, setTempValue] = useState(25)
    const [humidityValue, setHumidityValue] = useState(30);

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

        checkTemp();

    }, [telemetry])

    function checkTemp() {
        if (tempValue < tempMin) {
            setTempTooLow(true)
        }

        if (tempValue > tempMax) {
            setTempTooHigh(true)
        }

        if (humidityValue < humidityMin) {
            setHumidityTooLow(true)
        }

        if (humidityValue > humidityMax) {
            setHumidityTooHigh(true)
        }

    }

    function onClick(e) {
        if (e.target.value == "temp") {
            restoreAlarm(props.device.tempId)
            if (e.target.name == "high") {
                setTempTooHigh(false)
            }
            else setTempTooLow(false)

        }
        if (e.target.value == "humidity") {
            restoreAlarm(props.device.humidityId)
            if (e.target.name == "high") {
                setHumidityTooHigh(false)
            }
            else setHumidityTooLow(false)


        }
        checkTemp()
    }


    return <div className='device'>
        <p>{props.device.name}</p>
        <div className='device-data'>
            <div className='data-div'> <p>Temperatur</p>
                <p>{tempValue}°C</p>
                {(tempTooHigh) ?
                    <div className='alert-div'>FÖR HÖGT
                        <button className='alert-button' name="high" value={"temp"} onClick={onClick}> Återställ
                        </button>
                    </div>
                    :
                    null
                }
                {(tempTooLow) ?
                    <div className='alert-div'>FÖR LÅGT
                        <button className='alert-button' name="low" value={"temp"} onClick={onClick}>Återställ
                        </button>
                    </div>
                    :
                    null
                }
            </div>
            {(humidityMax != undefined) ?
                <>
                    <div className='data-div'>
                        <p>Luftfuktighet </p>
                        <p>{humidityValue}%</p>
                        {(humidityTooHigh) ?
                            <div className='alert-div'>FÖR HÖGT <button className='alert-button' value={"humidity"} name={"high"} onClick={onClick}> Återställ
                            </button>
                            </div>
                            :
                            null
                        }
                        {(humidityTooLow)
                            ?
                            <div className='alert-div'>FÖR LÅGT
                                <button className='alert-button' value={"humidity"} name={"low"} onClick={onClick}>Återställ</button>
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