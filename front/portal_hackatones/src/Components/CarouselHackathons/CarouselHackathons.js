import { useState } from "react"
import './CarouselHackathons.css'
import arrow from '../../Media/Images/General/Arrow-down.svg'
import {DateTime} from "luxon";
import Modal from "../Modal/Modal";
import StarRating from "../StarRating/StarRating";


function ShowHackathon (h) {

    const [show,setShow] = useState(false)

    const startYear = h.start_date.split('-')[0]
    const startMonth = h.start_date.split('-')[1]
    const startDay = h.start_date.split('-')[2].split('T')[0]
    const startDateFormated = DateTime.fromISO(`${startYear}-${startMonth}-${startDay}`)
    const daysTo = (parseInt(startDateFormated.diffNow('days').toObject().days))
    const hasEnded = h.hackathon_status === 'realizado'
    const isRated = hasEnded && h.rate!== null
    const ableToRate = hasEnded && !isRated
    const isRanked = h.ranking !== null && h.ranking !== undefined

    const handleClose = (e) => {
        
        setShow(false)
    }


    return (
    
    <div className="hackathon">
        <h1>{h.hackathon_name}</h1>
        <div>Formato: {h.hackathon_place}</div>
        <div>Ciudad: {h.city}</div>
        <div>Fecha Inicio: {h.start_date.split('T')[0]}</div>
        <div>Fecha Final: {h.end_date.split('T')[0]}</div>
        <div>Tecnologías: {h.techs}</div>
        <div>Estado Hackathon: {h.hackathon_status}</div>
        <div > {!hasEnded && <div className="timeTo">Quedan {daysTo} días!!!</div>} </div>
        <div className='hackathonResults'>
            {isRanked && <div className='ranking'>{h.ranking}º </div>}
            <div className='rate'>{isRated ? 
                <div className='rate-box'> {h.rate} ⭐</div> : 
                ableToRate && 
                <div className="rate-modal">
                    <button onClick = {() => setShow(true)}>Valorar</button>
                </div>}
                </div>
                <Modal title="Valorar evento" show={show} onClose={() => setShow(false)}>
                    <StarRating handleClose={handleClose} idHackathon={h.id}/>
                </Modal>
        </div>

    </div>

    )
    
}

function CarouselHackathons ({hackathons}) {

    const [index,setIndex] = useState(0)
 


    if(!hackathons) return 'Loading...'

    const handleNext = () => setIndex(index < (hackathons.length -1)? index + 1: index + 0)
    const handlePrevious = () => setIndex(index > 0 ? index - 1: index + 0)

    let isFirst = index === 0
    let isLast = index === hackathons.length - 1
   

    return(
        <div className="carousel">
            <img id="previous" src={arrow} className={ isFirst ? 'off':'on'} onClick={handlePrevious}/>
            {ShowHackathon(hackathons[index])} 
            <img id="next" src={arrow} className={ isLast ? 'off':'on'} onClick={handleNext}/>       
        </div>
    )


}

export default CarouselHackathons