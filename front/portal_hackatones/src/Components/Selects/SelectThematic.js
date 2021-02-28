import {styleSelectPlace} from "../CreateHackathon/stylesSelect";
import Select from 'react-select';
import useFetch from "../../Hooks/useFetch";

function SelectThematic({onChange}) {

    let listThematics = useFetch('http://localhost:3001/info/listThematics');
    
    if (! listThematics) 
        listThematics = [];


    let optionsThematics = listThematics.map(thematic => ({"value": thematic.thematic, "label": thematic.thematic}));

    optionsThematics.unshift({"value": "", "label": "-- Sin filtro --"})

    const handleSelected = (newValue, actionMeta) => {
        onChange(newValue.value);
    }


    return (
        <div className="">
            <Select className="selectThematic"
                theme={styleSelectPlace}
                options={optionsThematics}
                placeholder={'Temática...'}
                onChange={handleSelected}/>
        </div>

    )
}


export default SelectThematic;