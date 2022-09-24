import React from "react";
import styles from "./NavButton.module.css";

const NavButton = (props) => {
    return (
        <>
            <button onClick={props.onClick} className={styles.button}>
                {props.children}
            </button>
        </>
    );
};

export default NavButton;
