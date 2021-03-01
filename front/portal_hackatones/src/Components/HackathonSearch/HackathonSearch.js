import SelectCity from '../Selects/SelectCity';
import SelectModality from '../Selects/SelectModality';
import SelectTechnologies from '../Selects/SelectTechnologies';
import SelectThematic from '../Selects/SelectThematic';
import {DateTime} from "luxon";
import './HackathonSearch.css';
import {useState} from 'react';
import useFetch from '../../Hooks/useFetch';
import {ShowHackathon} from '../CarouselHackathonsH/CarouselHackathons';
import {useHistory} from 'react-router-dom';


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
                <div id="imgHS"></div>


                <div id="textHS">
                    <h1>Descubre y participa</h1>

                    <p>
                        Los hackathons más importantes reunidos aquí para que encuentres tu hackathon ideals
                    </p>
                </div>
            </div>

            {/* menu filters */}
            <div className="hackathonSearchFilters">

                <div className="divSelectModality">
                    <SelectModality  onChange={handleModality}/>
                </div>

                <div>

                    <SelectTechnologies onChange={handleTech}/>
                </div>


                <div>

                    <SelectCity onChange={handleCity}/>
                </div>


                <div>

                    <SelectThematic onChange={handleThematic}/>
                </div>


                <div className="filterDate">
                    <label>Fecha inicio</label>
                    <input type='date'
                        min={today}
                        // defaultValue={today}
                        name="start_date"
                        value={start_date}
                        onChange={handleStartDate}

                        required/>
                </div>


                <div className="filterDate">
                    <label>Fecha fin</label>

                    <input type='date'
                        min={start_date}
                        value={end_date}
                        name="end_date"
                        onChange={handleEndDate}
                        required/>
                </div>


            </div>

            {/* show hackathons */}
            <div className="hackathonSearchHack">

                {
                ! listhackathons.Info ? listhackathons.map(hackathon => <div key={
                        hackathon.id
                    }
                    className="showHack"
                    onClick={
                        () => history.push(`/hackathon/${
                            hackathon.id
                        }`)
                }>
                    <ShowHackathon h={hackathon}/>
                </div>) : <div>No se han encontrado resultados ...</div>
            } </div>
        </div>
    )

}

export default HackathonSearch;
