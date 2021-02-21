import './headerHack.css';
import {DateTime} from "luxon";


function HeaderHack({h}){

    console.log('h :>> ', h.organizer[0]);

    const {cover_picture,hackathon_name, organizer, start_date, end_date
    , hackathon_place
    }= h;

    const dateStartTitle = DateTime.fromISO(start_date)
    .setLocale('es')
    .toFormat('DD');
    const dataStartAside = DateTime.fromISO(start_date)
    .setLocale('es')
    .toFormat('DDDD');

    const dataEndAside = DateTime.fromISO(end_date)
    .setLocale('es')
    .toFormat('DDDD');


    let logoLocation = (hackathon_place === 'online' ? 'online-2': 'location-4')

    const orgz = organizer[0].organizer;

    let url = `http://localhost:3001/static` + cover_picture || 'default.png' || '';
    let urlLgDate = 'http://localhost:3001/static/icons/clock-3.png';
    let urlLgLocation=`http://localhost:3001/static/icons/${logoLocation}.png`;




    return (
        <div className="headerHack">
            <div className="hTitle">
                <div id="logoTitle">
                    <img src={url} alt="logo-portada"/>
                </div>
                <div>
                    <h1>{hackathon_name}</h1>
                    <h4>{dateStartTitle}</h4>
                    <span>Organizado por {orgz.name}</span>
                </div>

            </div>
            <div className="hDataHack">
                <h1></h1>
                <p>
                    <img className="lgHack" src={urlLgDate} alt="logo-date"/>
                   Del {dataStartAside} a {dataEndAside}
                    </p>
                <p>
                    <img className="lgHack" src={urlLgLocation} alt="logo-location"/>
                    El modo del evento será: {hackathon_place}
                    </p>
                <button>Inicia & Registrate</button>
            </div>

        </div>
    )


}

export default HeaderHack;
