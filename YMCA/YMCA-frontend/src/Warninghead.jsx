import React, { useState } from "react";
import style from './css/Navbar.module.css';
import { AiFillWarning} from 'react-icons/Ai';

function WarningHead() {
    return (  
        <div className={AlarmHead}>
            <h1 className={style.warning_h1}>Antal larm: </h1>
                <AiFillWarning className={style.warning}/>
                
                    </div>
                    
        );
}
export default WarningHead;