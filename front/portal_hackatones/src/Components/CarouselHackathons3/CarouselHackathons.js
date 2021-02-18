import {useEffect, useState} from "react"
import './CarouselHackathons.css'
import arrow from '../../Media/Images/General/Arrow-down.svg'
import useFetch from "../../Hooks/useFetch";

let socialMedia = [];


(async () => {
    socialMedia = await fetch('http://localhost:3001/info/listSocialMedia');

    socialMedia = await socialMedia.json();

    if (! socialMedia) 
        socialMedia = [];
    

})()

function showHackathon(h) {

    let socialLink = searchSocialLinks(h, socialMedia);

    let socialLinks = socialLink.map(l => l.url);

    let url = `http://localhost:3001/static` + h.cover_picture || 'default.png';

    return (

        <div className="hackathon">
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
                h.start_date.split('T')[0]
            }</div>
            <div>
                <span>Fecha Final:
                </span>
                {
                h.end_date.split('T')[0]
            }</div>
            <div>
                <span>Estado Hackathon:
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
                h.thematic
            }</div>
            <div>
                <span>Tecnologías:
                </span>
                {
                h.tech.join(', ')
            }</div>
            <div>
                <span>Links:
                </span>
                <ul className="listLinks">
                    {
                    h.link.map(l => (! socialLinks.includes(l.url)) && <li key={
                        l.url
                    }>
                        <a href={
                                l.url
                            }
                            target="_blank">
                            {
                            l.web_name
                        }</a>
                    </li>)
                } </ul>
            </div>


            <div>
                <span>Social Media</span>
                <ul className="socialMedia">
                    {
                    socialLink.map(item => <li key={
                        item.urlSm
                    }>
                        <a href={
                                item.url
                            }
                            target="_blank">
                            <img id="sm" className="pequeña"
                                src={
                                    item.urlSm
                                }
                                alt={
                                    item.sm
                                }
                                key={
                                    item.urlSm
                                }/>
                        </a>
                    </li>)
                } </ul>
            </div>
        </div>

    )

}

const searchSocialLinks = (hack, socialMedia) => {


    let linksSm = [];

    let urlSm = 'http://localhost:3001/static/SocialMedia/';


    hack.link.forEach(link => {

        for (const social of socialMedia) {

            if (link.url.includes(social)) {

                linksSm.push({'sm': `${social}`, 'urlSm': `${urlSm}${social}.png`, 'url': link.url});

                break;
            }

        }
    })

    return linksSm;

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
            showHackathon(hackathons[index])
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
