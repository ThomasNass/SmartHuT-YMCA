import React, { useState } from "react";
import { CgLogOff } from 'react-icons/cg';
import { FaHistory } from 'react-icons/fa';
import { BsWind } from 'react-icons/bs';
import style from './css/Navbar.module.css';
import { useState } from "react";


function Navbar(props) {
  const switchToggled = (0 == props.alarmCount ? true : false)
  const isAlarmStyle = switchToggled ? `${style.nav}` : `${style.nav} ${style.alarm} `;

  const SignOutNow = async (e) => {
    e.preventDefault();
    try {
        window.location = "user/signout"
    }
    catch (error) {
        console.log(error)
    }
}


  return (
    <div className={style.navbarContainer}>
      <nav className={isAlarmStyle}>
        <div className={style.navbutton} onClick={SignOutNow}>
          <CgLogOff className={style.icon} />
          <p className={style.text}>Logga ut</p>
        </div>
        <div className={style.navbutton} onClick={props.showHistory}>
          <FaHistory className={style.icon} />
          <p className={style.text}>Historik</p>
        </div>
        <div className={style.navbutton} onClick={props.showClimate}>
          <BsWind className={style.icon} />
          <p className={style.text}>Klimat</p>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;