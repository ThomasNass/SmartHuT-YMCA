import React, { useState } from "react";
import { CgLogOff} from 'react-icons/cg';
import { FaHistory} from 'react-icons/fa';
import { BsWind} from 'react-icons/bs';
import style from './css/Navbar.module.css';
import {useState} from "react";
import Head from "./Head.jsx";

function Navbar(props) {
const [switchToggled, setswitchToggled] = useState(false);

const Alarm = (props) => {

  switchToggled ? setswitchToggled(false):setswitchToggled(true)

  console.log (switchToggled);
}
const isAlarmStyle= switchToggled ? `${style.nav} ${style.alarm} `: `${style.nav}`;



return ( 
    <div>
   
   <Head/>
      {props.children}

    <nav className={isAlarmStyle}>
      <div className={style.navbutton}>
        <CgLogOff className={style.icon}/> 
        <p className={style.text}>Logga ut</p>
        </div> 
          <div className={style.navbutton}>
          <FaHistory className={style.icon}/>
          <p className={style.text}>Historik</p>
          </div> 
            <div className={style.navbutton}>
            <BsWind className={style.icon}/>
            <p className={style.text}>Klimat</p>
           </div> 
           <button onClick={()=>Alarm(props)}>test</button>
      </nav>
</div>
 );
}
export default Navbar;