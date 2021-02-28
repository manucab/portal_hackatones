import {styleSelectPlace} from "../CreateHackathon/stylesSelect";
import Select from 'react-select';

function SelectModality({onChange}) {

    let optionPlace = [
        {
            "value": '',
            "label": '--Sin filtro--'
        },
        {
            "value": 'online',
            "label": 'Online'
        }, {
            "value": 'presencial',
            "label": 'Presencial'
        }, {
            "value": 'semipresencial',
            "label": 'Semipresencial'
        }
    ]

    const handlePlaceSelected = (newValue) => {
        onChange(newValue.value);
    }

    return (
        <div className="">
            <Select id="hackathon_place"
                theme={styleSelectPlace}
                options={optionPlace}
                onChange={handlePlaceSelected}
                placeholder={'Modalidad...'}
                />
        </div>

    )
}


export default SelectModality;
