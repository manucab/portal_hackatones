import {useState} from "react"
import './CarouselHackathons.css'
import {DateTime} from "luxon";

import arrowL from '../../Media/Images/General/arrowL.svg';
import arrowR from '../../Media/Images/General/arrowR.svg';


export function ShowHackathon({h}) {

    let url = `http://localhost:3001/static` + h.cover_picture || 'default.png';

    const organizer = h.organizer[0].organizer.name;
    const avatar = `http://localhost:3001/static` + h.organizer[0].organizer.avatar;

    return (

        <div className="hackathonCard">

<div className="photoCard">
                <img src={url} alt="logo"/>
            </div>
            <div className="thematicCard">
            {
                h.thematic.split(',').map(them =><span key={them} className="thematicItem">{them}</span>)
            }
                
            </div>
            <div className="titleCard">
                <h4>{
                h.hackathon_name
            }</h4>
            </div>

            <div className="descriptionCard">
            {
                h.hackathon_info
            }
            </div>

            <div className="dateCard">
                
                {
                    'Inicio, ' + 
                DateTime.fromISO(h.start_date).toFormat('DDD')
            }
            
            </div>

            <div className="organizerCard">
                <h5>Organizado por:</h5>
                <div>
                    <img src={avatar} alt="a"/>
                    <span>{organizer}</span>
                </div>

            </div>


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
            <img id="arrowCard"
                src={arrowL}
                alt="logo"
                className={
                    isFirst ? 'off' : 'on'
                }
                onClick={handlePrevious}/> {
            <ShowHackathon h={hackathons[index]} />
        }
            <img id="arrowCard"
                src={arrowR}
                alt="logo"
                className={
                    isLast ? 'off' : 'on'
                }
                onClick={handleNext}/>
        </div>
    )


}

export default CarouselHackathons
