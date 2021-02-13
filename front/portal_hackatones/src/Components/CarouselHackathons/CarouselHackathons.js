import { useState } from "react"
import './CarouselHackathons.css'
import arrow from '../../Media/Images/General/Arrow-down.svg'

function showHackathon (h) {

    return (
    
    <div className="hackathon">
        <h1>{h.hackathon_name}</h1>
        <div>Formato: {h.hackathon_place}</div>
        <div>Ciudad: {h.city}</div>
        <div>Fecha Inicio: {h.start_date.split('T')[0]}</div>
        <div>Fecha Final: {h.end_date.split('T')[0]}</div>
        <div>Estado Hackathon: {h.hackathon_status}</div>
        <div>Tecnologías: {h.techs}</div>

    </div>

    )
    
}

function CarouselHackathons ({hackathons}) {

    const [index,setIndex] = useState(0)

    const handleNext = () => setIndex(index < (hackathons.length -1)? index + 1: index + 0)
    const handlePrevious = () => setIndex(index > 0 ? index - 1: index + 0)

    let isFirst = index === 0
    let isLast = index === hackathons.length - 1
    console.log(hackathons)
    if(!hackathons) return 'Loading...'

    return(
        <div className="carousel">
            <img id="previous" src={arrow} className={ isFirst ? 'off':'on'} onClick={handlePrevious}/>
            {showHackathon(hackathons[index])} 
            <img id="next" src={arrow} className={ isLast ? 'off':'on'} onClick={handleNext}/>       
        </div>
    )


}

export default CarouselHackathons