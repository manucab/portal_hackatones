import './Home.css';
import CarouselHackathons from '../CarouselHackathons/CarouselHackathons';
import {useEffect} from 'react';
import schedule from 'node-schedule';
import {DateTime} from "luxon";
import useFetch from '../../Hooks/useFetch';

function Home() {

    let hackathons = [];
    let start_date

    // This function runs at 24h 0min and 1sec -> Refresh date for search hackathons
    schedule.scheduleJob('15 * * * * *', async function () {

        const start_date = DateTime.local().setLocale('es').toISODate();

        console.log('start_date: ', start_date);

        const headers = {
            'Content-Type': 'application/json'
        }


        // const ret = await fetch('http://localhost:3000/hackathon/search/filters' + `?start_date=${start_date}`, {headers, method: 'GET'})


        // console.log('hackathons :>> ', hackathons);

    });

    //Esto es lo que fallaba con el carrusel. Te dejé lo tuyo comentado arriba para no borrarlo
    
    hackathons = useFetch('http://localhost:3000/hackathon/search/filters' + `?start_date=${start_date}`)
    console.log(hackathons)

    const getHachathonByDate = async () => {}


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
