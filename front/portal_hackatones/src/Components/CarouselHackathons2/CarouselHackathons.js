import { useEffect, useState } from "react"
import './CarouselHackathons.css'
import arrow from '../../Media/Images/General/Arrow-down.svg'
import useFetch from "../../Hooks/useFetch";

 function showHackathon (h, socialMedia) {


    if(socialMedia){
socialMedia.forEach(i => console.log(i.urlSm));
    }
   

    let url = `http://localhost:3001/static` + h.cover_picture || 'default.png';

    return (
    
    <div className="hackathon">
        <h1>{h.hackathon_name}</h1>
        <div id="logoHackathon"> 
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
        <div className="socialMedia">
            

            {
                socialMedia.map(item =>{
                    // <img src={item.urlSm} alt={item.sm} key={item.urlSm}/>
                    <div key={item.urlSm}>
                    <p>{item.urlSm}</p>
            </div>

                })
            }

        </div>
    </div>

    )
    
}

const searchSocialLinks = async(hack, socialMedia) =>{



    let linksSm =[];

    let objLink = {};
    let sm = '';
    let urlSm = 'http://localhost:3001/static/SocialMedia/';


    hack.link.forEach(link =>{

        for (const social of socialMedia) {

            if(link.url.includes(social)){

                linksSm.push({'sm': `${social}`, 'urlSm': `${urlSm}${social}.png`});

                break;
            }
        
        }
    })

    return linksSm;

}

function CarouselHackathons ({hackathons}) {

    const [index,setIndex] = useState(0)
    const [socialLink, setSocialLink] = useState([]);
    const [state, setState] = useState(0);
    const [currentHack, setCurrentHack] = useState(hackathons[0]);


    let socialMedia =  useFetch('http://localhost:3001/info/listSocialMedia');
    if(!socialMedia) socialMedia =[];

    let slink = [];


    useEffect(async() => {
        slink = await searchSocialLinks(hackathons[index],socialMedia );

        console.log('slink :>> ', slink);

        if(slink.length > 0){setSocialLink([...slink]);}

        setState(state + 1);
        setCurrentHack(hackathons[index]);

        }, [index])

    if(!hackathons) return 'Loading...';

 
const hand = () =>{

    console.log('load');
   
}




    const handleNext = e => {
        setIndex(index < (hackathons.length -1)? index + 1: index + 0)

    }

    const handlePrevious = e => {
        setIndex(index > 0 ? index - 1: index + 0)

    }

    let isFirst = index === 0
    let isLast = index === hackathons.length - 1

    return(
        <div className="carousel"  onLoad={hand}>
            <img id="previous" src={arrow} className={ isFirst ? 'off':'on'} onClick={handlePrevious}/>
      
           { state && showHackathon(currentHack, socialLink)} 
   
           
            <img id="next" onLoad={hand} src={arrow} className={ isLast ? 'off':'on'} onClick={handleNext}/>       
        </div>
    )


}

export default CarouselHackathons