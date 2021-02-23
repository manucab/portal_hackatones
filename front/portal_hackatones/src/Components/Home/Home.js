import './Home.css';
import CarouselHackathons from '../CarouselHackathons3/CarouselHackathons';
import {DateTime} from "luxon";
import useFetch from '../../Hooks/useFetch';
import {useHistory} from 'react-router-dom';


function Home() {
    const history = useHistory();
    const today = DateTime.local().setLocale('es').toISODate();

    let hackathonsRes = useFetch('http://localhost:3001/hackathon/search' + `?start_date=${today}`);

    if(!hackathonsRes) return 'Loading...';    
    const hasHackathon = (hackathonsRes && ! hackathonsRes.Info) ? true : false;

    // Show only 10 next hackathons
    const hackathons = hackathonsRes.slice(0, 10);

    return (
        <div className="home">

            {/* Header landing page */}
            <div className="header">
                <p>¿Quieres participar en un hackathon? Regístrate y empieza una aventura sin fin</p>
                <button id="btnRegister" value="/register"
                    onClick={
                        e => history.push(e.target.value)
                }>Regístrate</button>
                <button id="btnSearch" value="/hackathon//search/filters"
                    onClick={
                        e => history.push(e.target.value)
                }>Buscar hackathones</button>
                <button id="btnOrganizer" value="/createhackathon"
                    onClick={
                        e => history.push(e.target.value)
                }>Organizar hackathones</button>
            </div>
            {/* Next hackathons */}
            <div className="nextHackathons">

                
                 { hasHackathon && <CarouselHackathons hackathons={hackathons}/>}
                { hasHackathon && <button id="btnMoreHackathons" onClick={()=> history.push('/hackathon/search')} >Ver todos</button> }
            
                {/* TODO --> format style */}
                {
                ! hasHackathon && <div className="noInfo">No hay hackathones para las próximas fechas ...</div>
            } </div>
            {/* Last post of blog */}
            <div className="lastPostBlog"></div>
            {/* About */}
            <div className="about"></div>
        </div>
    );
}

export default Home;
