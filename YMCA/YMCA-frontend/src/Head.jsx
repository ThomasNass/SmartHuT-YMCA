import React from "react";
import style from './css/Navbar.module.css';


function Head(props) {

return (  
    <div className={style.head}>
    <h1 className={style.h1}>{props.title}</h1>
    </div>
    );
}
export default Head;