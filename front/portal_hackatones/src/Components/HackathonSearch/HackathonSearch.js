import SelectCity from '../Selects/SelectCity';
import SelectModality from '../Selects/SelectModality';
import SelectTechnologies from '../Selects/SelectTechnologies';
import SelectThematic from '../Selects/SelectThematic';
import {DateTime} from "luxon";
import './HackathonSearch.css';
import {useState} from 'react';
import useFetch from '../../Hooks/useFetch';
import {ShowHackathon} from '../CarouselHackathons3/CarouselHackathons';
import {useHistory } from 'react-router-dom';


const queryString = require('query-string');


function HackathonSearch() {

    const history = useHistory();

    const today = DateTime.local().setLocale('es').toISODate();

    const [start_date, setStart_date] = useState(today);
    const [end_date, setEnd_date] = useState('');
    const [hackathon_place, sethackathon_place] = useState('');
    const [tech, setTech] = useState('');
    const [city, setCity] = useState('');
    const [thematic, setThematic] = useState('');


    const params = {
        start_date,
        end_date,
        hackathon_place,
        tech,
        city,
        thematic
    }
    const url = 'http://localhost:3001/hackathon/search?' + queryString.stringify(params, {
        skipEmptyString: true
    }, {
        skipNull: true
    }, {sort: false})


    let listhackathons = useFetch(url);

    if (! listhackathons) 
        return 'Loading ...';
    

        console.log('listhackathons :>> ', listhackathons);

    let urlLogoTitle = `http://localhost:3001/static/hackathonPictures/logoTitle.gif`;

    const handleModality = (value) => {
        sethackathon_place(value);
    }

    const handleTech = (value) => {
        setTech(value);
    }

    const handleCity = (value) => {
        setCity(value);
    }

    const handleThematic = (value) => {
        setThematic(value);
    }

    const handleStartDate = e => {
        setStart_date(e.target.value);
    }

    const handleEndDate = e => {
        setEnd_date(e.target.value);
    }


    return (
        <div className="hackathonSearch">

            {/* Header */}
            <div className="hackathonSearchHeader">
                <h1>Lorenm Ipsum</h1>

                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <img src={urlLogoTitle}
                    alt="logoTitle"/>

            </div>

            {/* menu filters */}
            <div className="hackathonSearchFilters">

                <div>Modalidad
                    <SelectModality onChange={handleModality}/>

                </div>

                <div>
                    Tecnologias
                    <SelectTechnologies onChange={handleTech}/>

                </div>

                <div>
                    Ciudad
                    <SelectCity onChange={handleCity}/>

                </div>


                <div>
                    Temática
                    <SelectThematic onChange={handleThematic}/>

                </div>

                <div>
                    <label>Fecha inicio:
                        <input type='date'
                            min={today}
                            defaultValue={today}
                            name="start_date"
                            value={start_date}
                            onChange={handleStartDate}
                            required/></label>
                    <label>Fecha fin:
                        <input type='date'
                            min={start_date}
                            value={end_date}
                            name="end_date"
                            onChange={handleEndDate}
                            required/></label>
                </div>


            </div>

            {/* show hackathons */}
            <div className="hackathonSearchHach">

                {
                ! listhackathons.Info ? listhackathons.map(hackathon => <div className="showHack" onClick={ () =>history.push(`/hackathon/${hackathon.id}`)}>
                    <ShowHackathon  h={hackathon}/>
                </div>) : <div>No se han encontrado resultados ...</div>
            } </div>
        </div>
    )

}

export default HackathonSearch;
