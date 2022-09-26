import React from "react";
import * as styles from "./Head.module.css";

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

            </div>
        </>
    );
};

export default Head;
