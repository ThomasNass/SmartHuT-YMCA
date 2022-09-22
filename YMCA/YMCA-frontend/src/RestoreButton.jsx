import React, { useState } from 'react';

//props = show , deviceId , email 
export const RestartButton = (props) => {
    const [showButtonDuringLarm, setShowButtonDuringLarm] = useState(true);

    //-------- Move This function to Api folder, Make it export to import it here ------------//
    const Restart = async (deviceId, email) =>{
        const response = await fetch("https://smarthut.azurewebsites.net/api/restorealarm", {
            method: 'POST',
            body: JSON.stringify({
                "deviceId": `${deviceId}`,   // Send deviceId from another component via props.
                "userName": `${email}`               // Get email from getUser() function 
            })
        })
        const data = response;
        console.log(data)
        return data;
    }
//................................................................//


//-------- Handle the click --------- //
    const MakeRestart = async (e) => {
        e.preventDefault();
        try {
            Restart(props.deviceId, props.email) // Send info to fetch function , You will send them from another component via props.
            setShowButtonDuringLarm(false)   // Make the button hidden again
        }
        catch (error) {
            console.log(error)
        }
    }
    //-------------------------------//

    // if you send props.show={false} from another component display will be none, otherwise display:flex 
    return (
        <div style={props.show && showButtonDuringLarm ? { display: "flex" } : { display: "none" }}> 
            <button onClick={MakeRestart}>Återställ</button>
        </div>
    );

}