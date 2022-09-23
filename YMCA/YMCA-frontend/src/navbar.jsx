import React, { useState } from "react";
import { CgLogOff } from 'react-icons/cg';
import { FaHistory } from 'react-icons/fa';
import { BsWind } from 'react-icons/bs';
import style from './css/Navbar.module.css';
import { useState } from "react";
import Head from "./Head.jsx";
import Warninghead from "./Warninghead.jsx"

function Navbar(props) {
  const [switchToggled, setswitchToggled] = useState((0 == props.alarmCount ? true : false));
  // const Alarm = (props) => {

  //   switchToggled ? setswitchToggled(false) : setswitchToggled(true)

  //   console.log(switchToggled);
  // }
  const isAlarmStyle = switchToggled ? `${style.nav}` : `${style.nav} ${style.alarm} `;



  return (
    <div>



      {/* {props.children} */}

      <nav className={isAlarmStyle}>
        <div className={style.navbutton}>
          <CgLogOff className={style.icon} />
          <p className={style.text}>Logga ut</p>
        </div>
        <div className={style.navbutton}>
          <FaHistory className={style.icon} />
          <p className={style.text}>Historik</p>
        </div>
        <div className={style.navbutton}>
          <BsWind className={style.icon} />
          <p className={style.text}>Klimat</p>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;