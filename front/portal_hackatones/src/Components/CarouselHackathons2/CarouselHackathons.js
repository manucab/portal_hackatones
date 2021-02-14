import { useState } from "react"
import './CarouselHackathons.css'
import arrow from '../../Media/Images/General/Arrow-down.svg'

function showHackathon (h) {

    let url = `http://localhost:3000/static/hackathonPictures/default.jpg`;

    return (
    
    <div className="hackathon">
        <h1>{h.hackathon_name}</h1>
        <div id="logoHackathon"> 
            {/* {h.cover_picture} */}
        
        <img src={url} alt='logo'></img>
        </div>
        <div><span>Formato: </span> {h.hackathon_place}</div>
        <div><span>Ciudad: </span>{h.city}</div>
        <div><span>Fecha Inicio: </span>{h.start_date.split('T')[0]}</div>
        <div><span>Fecha Final: </span>{h.end_date.split('T')[0]}</div>
        <div><span>Estado Hackathon: </span>{h.hackathon_status}</div>
        <div><span>Informacion: </span>{h.hackathon_info}</div>
        <div><span>Temática: </span>{h.thematic}</div>
        <div><span>Tecnologías: </span>{h.tech.join(', ')}</div>
        <div><span>Links: </span> 
            <ul>{h.link.map(l => 
                <li key={l.url}>
                    <a href={l.url} target="_blank">{l.web_name}</a> 
                </li> )}
            </ul>
        </div>
    </div>

    )
    
}

function CarouselHackathons ({hackathons}) {

    const [index,setIndex] = useState(0)

    if(!hackathons) return 'Loading...'

    const handleNext = e => {
        setIndex(index < (hackathons.length -1)? index + 1: index + 0)
    }
    const handlePrevious = e => {
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