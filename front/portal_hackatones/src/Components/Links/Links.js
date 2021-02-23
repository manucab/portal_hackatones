import {useEffect, useState} from "react";
import useFetch from "../../Hooks/useFetch";

function Links({h}) {

    const urlSm = 'http://localhost:3001/static/SocialMedia/';

    const socialMedia = useFetch('http://localhost:3001/info/listSocialMedia');

    if (! socialMedia) {
        return 'Loadin ...'
    }


    const links = h.link;
    let socialLink = [];
    let regularLink = [];

    const setSocialLink = () => {
       socialMedia.forEach(social =>{
            links.map(link => {
                if (link.url.includes(social)) {
                    socialLink.push({'sm': `${social}`, 'urlSm': `${urlSm}${social}.png`, 'url': link.url});
                }
            })
        })
    }

const setRegularLinks = () =>{
    links.forEach(link => { 
            if(!socialLink.map(sm => sm.url).includes(link.url)){
                regularLink.push(link)
            }
            })
}

   setSocialLink();
    (socialLink.length === 0 ) ? regularLink = [...links] : setRegularLinks();



    return (
        <div className="links">
            <div>
                <span>Links
                </span>
                <ul className="listLinks">
                    {
                    regularLink.map(l => <li key={
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




export default Links;
