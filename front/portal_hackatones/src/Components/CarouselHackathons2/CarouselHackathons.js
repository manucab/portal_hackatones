import { useState } from "react"
import './CarouselHackathons.css'
import arrow from '../../Media/Images/General/Arrow-down.svg'

function showHackathon (h) {

    return (
    
    <div className="hackathon">
        <h1>{h.hackathon_name}</h1>
        <div> {h.cover_picture}</div>
        <div>Formato: {h.hackathon_place}</div>
        <div>Ciudad: {h.city}</div>
        <div>Fecha Inicio: {h.start_date.split('T')[0]}</div>
        <div>Fecha Final: {h.end_date.split('T')[0]}</div>
        <div>Estado Hackathon: {h.hackathon_status}</div>
        <div>Informacion: {h.hackathon_info}</div>
        <div>Temática: {h.thematic}</div>
        <div>Tecnologías: {h.tech.reduce((acc, curr) => `${acc}, ${curr}`)}</div>
        <div>Links: <ul>{h.link.map(l => <li>{l.web_name}: {l.url}</li> )}</ul></div>
    </div>

    )
    
}

function CarouselHackathons ({hackathons}) {

    const [index,setIndex] = useState(0)

    if(!hackathons) return 'Loading...'

    const handleNext = e => {
        e.preventDefault();
        setIndex(index < (hackathons.length -1)? index + 1: index + 0)
    }
    const handlePrevious = e => {
        e.preventDefault()
        setIndex(index > 0 ? index - 1: index + 0)
    }

    let isFirst = index === 0
    let isLast = index === hackathons.length - 1

    return(
        <div className="carousel">
            <img id="previous" src={arrow} className={ isFirst ? 'off':'on'} onClick={handlePrevious}/>
            {showHackathon(hackathons[index])} 
            <img id="next" src={arrow} className={ isLast ? 'off':'on'} onClick={handleNext}/>       
        </div>
    )


}

export default CarouselHackathons