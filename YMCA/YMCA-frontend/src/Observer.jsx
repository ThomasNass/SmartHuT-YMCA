import React, { useEffect } from 'react';


export const Observer = (props) => {


    useEffect(() => {

        //Get the user info with token from backend
        const getUser = async () => {
            try {
                const response = await fetch(`https://localhost:5000/user`);
                const data = await response.json();

                return data;
            }
            catch (e) {
                console.error(e)
            }
        }

        const SaveMyToken = async () => {
            let myToken = await getUser();  // get info
            localStorage.setItem("token", myToken.token) // save it in localstorage
            let data = await TryToConnectWithSmartHut(myToken.token);   // Try to connect with smarthut
            console.log(data.status)
            if (data.status == 401) {  // If Unauthorize  
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


        SaveMyToken();

    }, [])


}