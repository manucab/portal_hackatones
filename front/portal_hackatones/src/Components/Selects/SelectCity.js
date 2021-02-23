import {styleSelectPlace} from "../CreateHackathon/stylesSelect";
import Select from 'react-select';
import useFetch from "../../Hooks/useFetch";

function SelectCity({onChange}) {


    let listCities = useFetch('http://localhost:3001/info/listCities');


    if (! listCities) 
        listCities = [];
    
    let optionsCity = listCities.map(city => ({"value": city.city, "label": city.city}));
    optionsCity.unshift({"value": "", "label": "-- Sin filtro --"})


    const handleSelected = (newValue, actionMeta) => {
        onChange(newValue.value);
    }


    return (
        <div className="">
            <Select className="selectTechs"
                
                theme={styleSelectPlace}
                options={optionsCity}
                defaultValue='Selecciona...'
                onChange={handleSelected}/>
        </div>

    )
}


export default SelectCity;
