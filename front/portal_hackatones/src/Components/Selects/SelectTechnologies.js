import {styleSelectPlace} from "../CreateHackathon/stylesSelect";
import Select from 'react-select';
import useFetch from "../../Hooks/useFetch";

function SelectTechnologies({onChange}) {


    let listTechs = useFetch('http://localhost:3001/info/listTech');


    if (! listTechs) 
        listTechs = [];
    


    let optionsTech = listTechs.map(tech => ({"value": tech.tech_name, "label": tech.tech_name}));
    optionsTech.unshift({"value": "", "label": "-- Sin filtro --"})


    const handleTechSelected = (newValue, actionMeta) => {
        onChange(newValue.value);
    }


    return (
        <div className="">
            <Select className="selectTechs"
                id="hackathon_place"
                theme={styleSelectPlace}
                options={optionsTech}
                defaultValue='Selecciona...'
                onChange={handleTechSelected}/>
        </div>

    )
}


export default SelectTechnologies;
