import { createRef, useState } from 'react';
import useFetch from '../../Hooks/useFetch';
import './CreateHackathon.css';
import Select, { components } from 'react-select';
import { Redirect, useHistory } from 'react-router-dom';
import CreatableSelect from "react-select/creatable";
import {styleSelectPlace} from './stylesSelect';
import {DateTime} from "luxon";
import chroma from 'chroma-js';


function CreateHackathon(){

    const history = useHistory();

    const [hackathon_place, sethackathon_place] = useState('online');
    const [hackathon_name, setHackathon_name] = useState('');
    const [city, setCity] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [hackathon_status, sethackathon_status] = useState('pendiente');
    const [hackathon_info, sethackathon_info] = useState('');
    const [thematic, setThematic] = useState('');
    const [webName, setWebName] = useState('');
    const [webUrl, setWebUrl] = useState('');
    const [links, setLinks] = useState([]);
    const [hasWeb, setHasWeb] = useState(false);
    const [techs, setTechs] = useState([]);

    let tech = [];
    const today = DateTime.local().setLocale('es').toISODate();

    const handleTechSelected = (newValue, actionMeta) => {
         tech = newValue.map(item => item.value).flat();
         setTechs(tech);
    }

    const handlePlaceSelected= (newValue) => {
        console.log('newValue :>> ', newValue.value);
        sethackathon_place(newValue.value);
   }


    const handleStatusSelected= (newValue) => {
        sethackathon_status(newValue.value);
   }

    const handleThematicSelected = (newValue, actionMeta) => {
        let valuesThematics = newValue.map(item => item.value);
        setThematic([...valuesThematics]);
    }

    const  handleSubmit = async e =>{
        e.preventDefault();

        const fd = new FormData();
        const logo = e.target.cover_picture.files[0] ;       

        console.log(logo);

        fd.append('cover_picture', logo);
        fd.append(  'hackathon_place',hackathon_place );
        fd.append(  'hackathon_name', hackathon_name );
        fd.append(  'city', city );
        fd.append(  'start_date', start_date );
        fd.append(  'end_date', end_date );
        fd.append(  'hackathon_status', hackathon_status );
        fd.append(  'hackathon_info', hackathon_info );
        fd.append(  'thematic',  JSON.stringify(thematic));
        fd.append(  'techs', JSON.stringify(techs));
        fd.append(  'links', JSON.stringify(links));

        const headers = {
            // 'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZnamNhcmxvc0BnbWFpbC5jb20iLCJyb2wiOiJvcmdhbml6ZXIiLCJpZCI6MSwiaWF0IjoxNjEzNDIxNTM1LCJleHAiOjE2MTM1OTQzMzV9.5B6j7XI3Hy6Qt4KL9Cx5jpGs-L2txndTEe4-aqiCM-A'
        }

        const ret =  await fetch('http://localhost:3000/createhackathon', {
            headers,
            body: fd,
            method: 'POST'
        })

        if(ret.ok){
            alert('¡Felicidades, te has registrado!');
            return history.push('/profile');
        }
    }

    const handleWebName = e =>{
        setWebName(e.target.value);
    }

    const handleWebUrl = e =>{
        setWebUrl(e.target.value);
    }

    const handleRemoveLink = e => {
        
        setLinks(links.filter(link => link.link !== e))


        console.log(links);

console.log('remove link :>> ', e);

    }

    const handleListLinks = e =>{

        const urlInList =  links.map(link => link.link).includes(webUrl);

        setHasWeb(urlInList);

        if(webUrl && webName && !urlInList) {
            setLinks([...links,{"link": webUrl,"webName": webName,}]);
            setWebUrl('');
            setWebName('');
        }

    }

    let listTechs =  useFetch('http://localhost:3000/info/listTech');
    let listThematics =  useFetch('http://localhost:3000/info/listThematics');

    if(!listTechs) listTechs =[];
    if(!listThematics) listThematics =[];

    let optionsTech = listTechs.map(tech => ({"value": tech.tech_name, "label": tech.tech_name}));
    let optionsThematics = listThematics.map(thematic => ({"value": thematic.thematic, "label": thematic.thematic}));
    let optionStatus = [{"value": 'pendiente', "label": 'Pendiente'},{"value": 'realizado', "label": 'Realizado'},{"value": 'cancelado', "label": 'Cancelado'}]
    let optionPlace = [{"value": 'online', "label": 'Online'},{"value": 'presencial', "label": 'Presencial'},{"value": 'semipresencial', "label": 'Semipresencial'}]
    

    return(

        <div className="createHackathon">

                <form className="formCreate" onSubmit={handleSubmit} method='POST'>
                    {/* Image of header article */}
                    <div id="logo">
                        Selecciona la foto principal de la portada
                        <input type="file" name="cover_picture" accept="image/*"/>
                    </div>

                    <fieldset className="fieldName">
                        <legend>Nombre || Modalidad || Ubicación</legend>

                        <label>Nombre: <input type='text' name="hackathon_name" onChange={e =>setHackathon_name(e.target.value)} required/></label>

                        <label>Modalidad: 
                        <Select id="hackathon_place"  theme={styleSelectPlace} options={optionPlace} defaultValue={optionPlace[0]} onChange={handlePlaceSelected} required />
                        </label>
                        <label>Ciudad: <input type='text' name="city" onChange={e =>setCity(e.target.value)} required/></label>
                </fieldset>


                <fieldset className="fieldDates">
                    <legend>Fechas de realización</legend>
                   <label>Fecha inicio: <input type='date' min={today} value={today} name="start_date" onChange={e =>setStart_date(e.target.value)} required/></label>
                   <label>Fecha fin: <input type='date' name="end_date" onChange={e =>setEnd_date(e.target.value)} required /></label>
                </fieldset>

                <fieldset className="fieldState">
                    <legend>Estado</legend>
                    <label>Selecciona un estado: </label>
                    <Select id="hackathon_status" options={optionStatus} defaultValue={optionStatus[0]} onChange={handleStatusSelected} required/>
                </fieldset>

               <div className="techs">
                   <fieldset>
                        <legend>Tecnologías</legend>
                        <CreatableSelect className="selectTechs" /* components={makeAnimated()}*/ isMulti options={optionsTech} onChange={handleTechSelected}   />
                   </fieldset>
               </div>
               

               <div  className="links">
                    <fieldset id="fieldLinks">
                        <legend>Enlaces</legend>
                        <div className="divLink">
                            <label id="lblWebName">Nombre web: <input value={webName} type='text' name="webName" onChange={handleWebName} placeholder="Hackathon Play" /></label>
                            <label id="lblUrl">Url: <input type='url' value={webUrl}  name="url" onChange={handleWebUrl} placeholder="www.hackathonplay.com" /></label>
                            <div id="btnLink" onClick={handleListLinks}><p>➡️</p></div>
                        </div>
                        {hasWeb && <span>Ya exite una url en tu lista...</span>}
                        <div id="listLinks">
                            <ul>
                            { !(links.length > 0) && <p className="noLinks">No hay enlaces agregados</p>}
                                {links.map(link=> 
                                <li key={link.link}>
                                    <div>
                                   <span>Nombre: </span>{link.webName}, <span>URL: </span>{link.link} 
                                        
                                    </div>
                                    <div id="btnDeleteLink" onClick={() =>handleRemoveLink(link.link)}><p>🗑</p></div>
                                </li>
                                )}
                            </ul>
                        </div>
                    </fieldset>
                </div>

                <fieldset id="fieldDescription">
                    <legend>Descripción</legend>
                    <label>Temática: 
                    </label>  
                    <CreatableSelect className="selectThematic" /* components={makeAnimated()}*/ isMulti options={optionsThematics} onChange={handleThematicSelected} required  />         
                    <label>Descripción: </label>
                    <textarea type='text' name="hackathon_info" onChange={e =>sethackathon_info(e.target.value)} required/>
                            
                </fieldset>

                <button id="btnSubmit" type="submit">Enviar</button>
            </form>

        </div>

    );

}

export default CreateHackathon;