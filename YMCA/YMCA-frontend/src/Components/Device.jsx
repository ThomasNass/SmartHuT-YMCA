import React from 'react'
import useDevice from './Hooks/useDevice'

const Device = (props) => {
    const {
        currentValue: currentValue,
        isAlarm: isAlarm,
        reset: resetAlarm
    } = useDevice(props.device)



    return (
        <div>
            <h2>{props.device.name}</h2>
            <p>Nuvarande värde: {currentValue}</p>
            {isAlarm && <button onClick={resetAlarm}>Återställ</button>}
        </div>
    )
}

export default Device