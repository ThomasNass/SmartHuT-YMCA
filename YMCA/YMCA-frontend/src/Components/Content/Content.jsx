import React from "react";
import Building from "../Building/Building";
import * as styles from "./Content.module.css";
import History from "../History/History";

const Content = (props) => {        
    return (
        <>
            <div className={styles.container}>
                <Building showClimate={props.showClimate} />
                <History showClimate={props.showClimate} />
            </div>
        </>
    );
};

export default Content;
