//data ska vara datan som kommer ifrån anropet till smarthut/buildingInfo/id
//import data from "../data.json";

 const formattedData = (data) => {
    let tempArray = [];
    data.devices.forEach(device => {

        //Skapar nya objekt där namnet är utan temp/humidity samt att min/max har ändrats så att de är specifika för metrictype så att de senare kan slås samman
        let newDevice = {}
        if (device.metricType == 1) {
            newDevice.tempMin = device.minValue
            newDevice.tempMax = device.maxValue
            newDevice.tempId = device.id
        }
        if (device.metricType == 2) {
            newDevice.humidityMin = device.minValue
            newDevice.humidityMax = device.maxValue
            newDevice.humidityId = device.id
        }

        newDevice.name = removeFirstWord(device.name)
        tempArray.push(newDevice)

    });

    //här slås objekten samman i arrayen
    let temp2 = []
    for (let i = 0; i < tempArray.length; i++) {
        for (let j = tempArray.length - 1; 0 < j; j--) {
            if (tempArray[i].name == tempArray[j].name) {
                let obj = { ...tempArray[i], ...tempArray[j] };
                temp2.push(obj)
                break;
            }
        }
    }

    //Här filtreras dubbletter bort
    for (let i = 0; i < temp2.length; i++) {
        for (let j = temp2.length - 1; 0 < j; j--) {
            if (temp2[i].name == temp2[j].name) {
                if (Object.keys(temp2[i]).length > Object.keys(temp2[j]).length) {
                    temp2.splice(j, 1);
                }


            }
        }
    }
    console.log(temp2)
    return temp2
}

//tar bort första ordet i namnet; dvs temperature/humidity
function removeFirstWord(str) {
    const indexOfSpace = str.indexOf(' ');

    if (indexOfSpace === -1) {
        return '';
    }

    return str.substring(indexOfSpace + 1);
}

export default formattedData;