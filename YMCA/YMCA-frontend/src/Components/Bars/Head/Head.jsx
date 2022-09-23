import React from "react";
import * as styles from "./Head.module.css";
import { IoWarning } from "react-icons/io5";

const Head = (props) => {
    const isAlarm = props.alarmCount > 0;

    const style = isAlarm
        ? `${styles.head} ${styles.alarm}`
        : `${styles.head}`;

    const text = isAlarm ? `ANTAL LARM: ${props.alarmCount}` : "INGA LARM";

    return (
        <>
            <div className={style}>
                {text}
                {isAlarm && <IoWarning className={styles.icon} />}
            </div>
        </>
    );
};

export default Head;
