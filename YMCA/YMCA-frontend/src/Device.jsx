import React, { UseState, UseEffect } from "react";

const Device = (props) => {

    // const tempValue = props.tempTelemetry.value;
    // const humidityValue = props.humidityTelemetry.value;

    const telemetry = props.telemetry.value;

    return <div>
        {/* <p>{tempValue}</p>
        <p>{humidityValue}</p> */}
        <p>{telemetry}</p>
    </div>

}

export default Device;