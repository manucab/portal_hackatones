import './headerHack.css';
import {DateTime} from "luxon";
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import useFetchPostEnrrol from '../../../Hooks/useFetchPostEnrrol';
import useFetch from '../../../Hooks/useFetch';
import useFetchExpiredJwt from '../../../Hooks/useFetchExpiredJwt';


function HeaderHack({h}) {

    const [enrrol, setEnrrol] = useState(0);

    const login = useSelector(s => s.login);

    const {
        cover_picture,
        hackathon_name,
        organizer,
        start_date,
        end_date,
        hackathon_place,
        id,
        city
    } = h;

    let id_hackathon = id;
    let inscription_status = 'inscrito';

    const dateStartTitle = DateTime.fromISO(start_date).setLocale('es').toFormat('DD');
    const dataStartAside = DateTime.fromISO(start_date).setLocale('es').toFormat('DDDD');
    const dayStart = DateTime.fromISO(start_date).setLocale('es').toFormat('d');
    const monthStart = DateTime.fromISO(start_date).setLocale('es').toFormat('LLLL');
    const year = DateTime.fromISO(start_date).setLocale('es').toFormat('yyyy');

    const dataEndAside = DateTime.fromISO(end_date).setLocale('es').toFormat('d');
    const dayEnd = DateTime.fromISO(end_date).setLocale('es').toFormat('d');
    const monthEnd = DateTime.fromISO(end_date).setLocale('es').toFormat('LLLL');

    let logoLocation = (hackathon_place === 'online' ? 'online-2' : 'location-3')

    const orgz = organizer[0].organizer;

    const random = (min, max) => {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    const numIlustration = random(1, 10);

    console.log('numIlustration :>> ', numIlustration);

    let url = `http://localhost:3001/static` + cover_picture || 'default.png' || '';
    let urlLgDate = 'http://localhost:3001/static/icons/clock-3.png';
    let urlLgModality = `http://localhost:3001/static/icons/${logoLocation}.png`;
    let urlLgLocation = `http://localhost:3001/static/icons/location-6.png`;
    let urlLogoTitle = `http://localhost:3001/static/ilustrations/i${numIlustration}.png`;


    let urlJoinHackathon = `http://localhost:3001/hackathon/${id_hackathon}/enroll`

    const ret = useFetchPostEnrrol({
        inscription_status
    }, enrrol, urlJoinHackathon, login)


    const data = useFetchExpiredJwt();
    let hackathonsId = [];


    hackathonsId = (data) ? data[1].map(hackathon => hackathon.id) : hackathonsId;

    if (ret && ret.status === 200) {
        console.log('Felicidades te has registrado :>> ');

        return <Redirect to={
            `/user/${
                login.user.id
            }`
        }/>;
    }

    const handleJoin = () => {

        let r = false;

        if (! login) 
            return <Redirect to="/register"/>;
        

        if (login) {
            r = window.confirm("¿Quieres participar en este hackathon?");
        }

        if (r) {
            setEnrrol(enrrol + 1);
        }

    }


    return (
        <div className="headerHack">

            <div className="hTitle">
                <div id="logoTitle">
                    <img src={urlLogoTitle}
                        alt="logo-portada"/>
                </div>
                <div id="textTitle">
                    <h1>{hackathon_name}</h1>
                    <h4 className="dateTitle">{
                        `${dayStart} ${monthStart} - ${dayEnd} ${monthEnd}, ${year}`
                    }</h4>
                    <div>
                        <p>Organizado por
                            <span>{
                                orgz.name
                            }</span>
                        </p>
                        <img id="logoCompany"
                            src={url}
                            alt="logo-company"/>
                    </div>

                </div>

            </div>
            <div className="hDataHack">
                <div>
                    <h3>{hackathon_name}</h3>
                    <img className="lgHack"
                        src={urlLgDate}
                        alt="logo-date"/>
                    <p> {
                        `Inicio el ${dayStart} ${monthStart} `
                    } </p>

                    <p> {
                        `y finaliza el ${dayEnd} ${monthEnd}`
                    } </p>
                    <br/>
                    <br/>
                    <img className="lgHack"
                        src={urlLgModality}
                        alt="logo-modality"/>
                    
                    
                    <p>

                        El modo del evento será: <span>{hackathon_place}</span></p>
                        <br/>
                        <br/>
                        <img className="lgHack"
                        src={urlLgLocation}
                        alt="logo-location"/>
                        <p>La ubicación es: <span>{city}</span></p>
                </div>

                {
                hackathonsId.includes(id_hackathon) ? <div className="enrollDiv">Ya estas inscrito</div> : <button onClick={handleJoin}>Inicia & Regístrate</button>
            } </div>

        </div>
    )


}

export default HeaderHack;
