import React, { useEffect } from 'react';
import { getUser } from '../js/script';


export const Observer = (props) => {

    useEffect(() => {

        const CheckStatus = async () => {
            let myToken = await getUser();  // get info
            let data = await TryToConnectWithSmartHut(myToken.token);   // Try to connect with smarthut
            console.log(data.status)
            if (data.status == 401) {  // If Unauthorize  
                alert("The session is over, Login again")
                localStorage.clear(); // clear localStorage
                window.location = "https://localhost:5000/user/signout"  //RedirectTo Logout
            }

        }

        //Function to Check The response
        const TryToConnectWithSmartHut = async (token) => {
            try {
                let response = await fetch("https://api.smarthut.se/buildinginfo/getmybuilding", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                return response;
            }
            catch (e) {
                console.log(e)
            }

        }


        CheckStatus();

    }, [])


}