import './headerHack.css';
import {DateTime} from "luxon";
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import useFetchPostEnrrol from '../../../Hooks/useFetchPostEnrrol';
import useFetch from '../../../Hooks/useFetch';


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
        id
    } = h;

    let id_hackathon = id;
    let inscription_status = 'inscrito';

    const dateStartTitle = DateTime.fromISO(start_date).setLocale('es').toFormat('DD');
    const dataStartAside = DateTime.fromISO(start_date).setLocale('es').toFormat('DDDD');

    const dataEndAside = DateTime.fromISO(end_date).setLocale('es').toFormat('DDDD');


    let logoLocation = (hackathon_place === 'online' ? 'online-2' : 'location-4')

    const orgz = organizer[0].organizer;

    let url = `http://localhost:3001/static` + cover_picture || 'default.png' || '';
    let urlLgDate = 'http://localhost:3001/static/icons/clock-3.png';
    let urlLgLocation = `http://localhost:3001/static/icons/${logoLocation}.png`;
    let urlLogoTitle = `http://localhost:3001/static/hackathonPictures/logoTitle.gif`;


    let urlJoinHackathon = `http://localhost:3001/hackathon/${id_hackathon}/enroll`

    const ret = useFetchPostEnrrol({
        inscription_status
    }, enrrol, urlJoinHackathon, login)


    const data = useFetch(`http://localhost:3001/user/${
        login.user.id
    }`)

    if (! data) 
        return 'Loading...';

    const hackathonsId = data[1].map(hackathon => hackathon.id);

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
                <div>
                    <h1>{hackathon_name}</h1>
                    <h4>{dateStartTitle}</h4>
                    <span><img id="logoCompany"
                            src={url}
                            alt="logo-company"/>Organizado por {
                        orgz.name
                    }</span>
                </div>

            </div>
            <div className="hDataHack">
                <h1></h1>
                <p>
                    <img className="lgHack"
                        src={urlLgDate}
                        alt="logo-date"/>
                    Del {dataStartAside}
                    a {dataEndAside} </p>
                <p>
                    <img className="lgHack"
                        src={urlLgLocation}
                        alt="logo-location"/>
                    El modo del evento será: {hackathon_place} </p>
                {
                 hackathonsId.includes(id_hackathon) ?<div>Ya estas inscrito</div> : <button onClick={handleJoin}>Inicia & Registrate</button> 
            }
 
            </div>

        </div>
    )


}

export default HeaderHack;
