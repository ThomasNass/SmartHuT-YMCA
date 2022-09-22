import React, { useEffect, useState } from "react";
import { getBuildingDevices } from "../../js/script";
import Room from "./Room/Room";
import * as styles from "./Building.module.css";

const Building = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        (async () => {
            const devices = await getBuildingDevices();
            const filteredRoom = createRooms(devices);
            setRooms(filteredRoom);
        })();
    }, []);


    const onAlarmChangeHandler = (roomName, isAlarm) => {
        const tempRooms = rooms.map((room) => {
            if (room.name === roomName) {
                return { ...room, isAlarm: isAlarm };
            }
            return room;
        });
        console.log("TempRooms ", tempRooms);
        const tempSortedRooms = tempRooms.sort((a, b) => b.isAlarm - a.isAlarm);
        console.log("TempSortedRooms ", tempSortedRooms);

        setRooms(tempRooms);
        // setRooms((prevRooms) => {
        //     return prevRooms
        //         .map((room) => {
        //             if (room.name === roomName) {
        //                 return { ...room, isAlarm: isAlarm };
        //             }
        //             return room;
        //         })
        //         .sort((a, b) =>
        //             a.isAlarm - b.isAlarm
        //         )
        // });
    };

    const createRooms = (devices) => {
        const tempRooms = [];

        devices.forEach((device) => {
            const roomName = device.name.substr(device.name.indexOf(" ") + 1);

            tempRooms.some((obj) => obj.name.includes(roomName))
                ? true
                : tempRooms.push(device);
        });

        return tempRooms.map((tempRoom) => {
            const roomName = tempRoom.name.substr(
                tempRoom.name.indexOf(" ") + 1
            );

            const filteredDevices = devices
                .filter((device) => device.name.includes(roomName))
                .sort((a, b) => a.name - b.name);

            return {
                name: roomName,
                devices: filteredDevices.map((device) => {
                    return { ...device, isAlarm: false };
                }),
                isAlarm: false,
            };
        });
    };

    return (
        <>
            <div className={styles.container}>
                {rooms.length > 0 &&
                    rooms.map((room, key) => {
                        return (
                            <Room
                                onAlarmChange={onAlarmChangeHandler}
                                room={room}
                                key={key}
                            />
                        );
                    })}
            </div>
        </>
    );
};

export default Building;
