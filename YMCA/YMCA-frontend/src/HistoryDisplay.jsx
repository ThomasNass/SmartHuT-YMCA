import styles from './history.module.css';
export const HistoryDisplay = (props) => {

const Humi = (Hum) =>{
    if( Hum != null){
        return(
            <div className={styles.humidity}>
            <div className={styles.humidityHeader}>
            <span className={styles.sensorType}>Luftfuktighetslarm</span>
            </div>
            <div className={styles.humidityDivHistory}>
                <div>{props.Hum}</div>
            </div>
            </div>
        )
    }
   }

   const Tem = (Temp) =>{
    if(Temp != null){
        return(
    <div className={styles.temperature}>
    <div className={styles.temperatureHeader}>
    <span className={styles.sensorType}>Temperaturlarm</span>
    </div>
    <div className={styles.temperatureDivHistory}>
    <span>{props.Temp}</span>
     </div>
      </div>
        )
   }
}

    return(

        <div className={styles.containerHistory}>
        <div className={styles.mainDivHistory}>
        <div className={styles.headerDivHistory}>
            <span className={styles.roomName}>{props.room}</span>
        </div>
        <div className={styles.historyInfo}>
            {Tem(props.Temp)}
            {Humi(props.Hum)}
        </div>
    </div>
    </div>
   

    
    )

}