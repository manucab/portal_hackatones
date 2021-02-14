import './Home.css';
import CarouselHackathons from '../CarouselHackathons2/CarouselHackathons';
import {useEffect} from 'react';
import {DateTime} from "luxon";
import useFetch from '../../Hooks/useFetch';

function Home() {

    let hackathons = [];

        const start_date = DateTime.local().setLocale('es').toISODate();

    
    hackathons =  useFetch('http://localhost:3000/hackathon/search/filters' + `?start_date=${start_date}`)

    console.log('hackathons',hackathons);

    useEffect(() => {}, [])


    const handleSubmit = async e => {
        e.preventDefault()

        // if(ret.status === 200){

        //     alert('¡Felicidades, te has registrado!');
        //     return history.push('/');
        // }
    }

    return (
        <div className="home">
            {/* Header landing page */}
            <div className="header">
                <p>¿Quieres participar en un hackathon? Regístrate y empieza una avetura sin fin</p>
                <button id="btnRegister">Regístrate</button>
                <button id="btnSearch">Buscar hackathones</button>
                <button id="btnOrganizer">Organizar hackathones</button>
            </div>
            {/* Next hackathons */}
            <div className="nextHackathons">

                <CarouselHackathons hackathons={hackathons}/>

            </div>
            {/* Last post of blog */}
            <div className="lastPostBlog"></div>
            {/* About */}
            <div className="about"></div>
        </div>
    );
}

export default Home;
