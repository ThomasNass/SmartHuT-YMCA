import React from "react";
import * as styles from "./Navbar.module.css";
import NavButton from "./NavButton";
import { CgLogOff } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { BsWind } from "react-icons/bs";

const Navbar = (props) => {
    const style =
        props.alarmCount > 0
            ? `${styles.navbar} ${styles.alarm}`
            : `${styles.navbar}`;

    const onClickHistory = () => {
        props.showClimateHandler(false);
    };

    const onClickClimate = () => {
        props.showClimateHandler(true);
    };

    const onClickLogout = () => {
        console.log("logOut");
    };

    return (
        <>
            <div className={style}>
                <div className={styles.wrapper}>
                    <NavButton onClick={onClickLogout}>
                        <CgLogOff className={styles.icon} />
                        Logga ut
                    </NavButton>
                    <NavButton onClick={onClickHistory}>
                        <FaHistory className={styles.icon} />
                        Historik
                    </NavButton>
                    <NavButton onClick={onClickClimate}>
                        <BsWind className={styles.icon} />
                        Klimat
                    </NavButton>
                </div>
            </div>
        </>
    );
};

export default Navbar;
