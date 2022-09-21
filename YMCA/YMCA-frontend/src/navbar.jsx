import React from "react";
import { CgLogOff} from 'react-icons/cg';
import { FaHistory} from 'react-icons/fa';
import { BsWind} from 'react-icons/bs';
import style from '../css/Navbar.module.css';
import { AiFillWarning} from 'react-icons/Ai';

function Navbar() {
  return ( 
  <div className={style.head}>
    <h1 className={style.h1}>Inga Larm</h1>
    <AiFillWarning className={`${style.icon} ${style.warning}`}/> 
      <nav className={style.nav}>
        <div className={style.navbutton}>
        <CgLogOff className={style.icon}> </CgLogOff>
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
      </nav>
  </div>
 );
}
export default Navbar;