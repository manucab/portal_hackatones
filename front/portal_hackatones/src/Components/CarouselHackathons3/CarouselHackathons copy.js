import {useEffect, useState} from "react"
import './CarouselHackathons.css'
import arrow from '../../Media/Images/General/Arrow-down.svg'
import useFetch from "../../Hooks/useFetch";
import {DateTime} from "luxon";
import Links from "../Links/Links";


export function ShowHackathon({h}) {

    let url = `http://localhost:3001/static` + h.cover_picture || 'default.png';

    return (

        <div className="hackathonHP">

            <h1>{
                h.hackathon_name
            }</h1>
            <div id="logoHackathon">
                <img src={url}
                    alt='logo'></img>
            </div>
            <div>
                <span>Formato:
                </span>
                {
                h.hackathon_place
            }</div>
            <div>
                <span>Ciudad:
                </span>
                {
                h.city
            }</div>
            <div>
                <span>Fecha Inicio:
                </span>
                {
                DateTime.fromISO(h.start_date).toISODate()
            }</div>
            <div>
                <span>Fecha Final:
                </span>
                {
                DateTime.fromISO(h.end_date).toISODate()
            }</div>
            <div>
                <span>Estado:
                </span>
                {
                h.hackathon_status
            }</div>
            <div>
                <span>Informacion:
                </span>
                {
                h.hackathon_info
            }</div>
            <div>
                <span>Temática:
                </span>
                {
                h.thematic.split(',').join(', ')
            }</div>
            <div>
                <span>Tecnologías:
                </span>
                {
                h.techs.map(t => t.tech).join(', ')
            }</div>
                <Links h={h}/>
        </div>

    )

}


function CarouselHackathons({hackathons}) {

    const [index, setIndex] = useState(0)

    if (!hackathons) 
        return 'Loading...';
    
    const handleNext = e => {
        setIndex(index < (hackathons.length - 1) ? index + 1 : index + 0)

    }

    const handlePrevious = e => {
        setIndex(index > 0 ? index - 1 : index + 0)

    }

    let isFirst = index === 0
    let isLast = index === hackathons.length - 1


    return (
        <div className="carousel">
            <img id="previous"
                src={arrow}
                className={
                    isFirst ? 'off' : 'on'
                }
                onClick={handlePrevious}/> {
            <ShowHackathon h={hackathons[index]} />
        }
            <img id="next"
                src={arrow}
                className={
                    isLast ? 'off' : 'on'
                }
                onClick={handleNext}/>
        </div>
    )


}

export default CarouselHackathons
