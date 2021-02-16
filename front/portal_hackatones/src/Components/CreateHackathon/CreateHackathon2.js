import { createRef, useState } from 'react';
import useFetch from '../../Hooks/useFetch';
import './CreateHackathon.css';
import Select, { components } from 'react-select';
import { Redirect, useHistory } from 'react-router-dom';

function CreateHackathon(){

    const history = useHistory();

    let selectTech = createRef();

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
    const [hasTech, setHasTech] = useState(false);
    const [techs, setTechs] = useState([]);
    const [otherTech, setOtherTech] = useState('');

    let tech = [];

    const handleSelected = e =>{
        tech = e.map(item => item.value).flat();

        setTechs(tech);
        console.log(tech);

        e
    }

    const handleOtherTech = (e)=>{
        setOtherTech(e.target.value);

        
    }

    const handleAddOtherTech = e =>{



        const techInList =  techs.includes(otherTech);

        setHasTech(techInList);

console.log('techInList :>> ', techInList);

        if(otherTech && !hasTech) {
            setTechs([...techs, otherTech]);
            setOtherTech('');
        }


    }

    const  handleSubmit = async e =>{
        // Add other tech
    

        console.log('techs :>> ', techs);

        e.preventDefault();

        const fd = new FormData();
        const logo = e.target.cover_picture.files[0] 
        fd.append('cover_picture', logo);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZnamNhcmxvc0BnbWFpbC5jb20iLCJyb2wiOiJvcmdhbml6ZXIiLCJpZCI6MSwiaWF0IjoxNjEzNDIxNTM1LCJleHAiOjE2MTM1OTQzMzV9.5B6j7XI3Hy6Qt4KL9Cx5jpGs-L2txndTEe4-aqiCM-A'
        }


        const ret =  await fetch('http://localhost:3000/createhackathon', {
            headers,
            body: JSON.stringify(
                {
                    hackathon_place,
                    hackathon_name,
                    city,
                    start_date,
                    end_date,
                    hackathon_status,
                    hackathon_info,
                    thematic,
                    techs,
                    links
                }, fd
            ),
            method: 'POST'
        })


        console.log('ret :>> ', ret);

        if(ret.status === 200){

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


    const handleListLinks = e =>{


        const urlInList =  links.map(link => link.link).includes(webUrl);

        setHasWeb(urlInList);

        if(webUrl && webName && !urlInList) {
            setLinks([...links,{"webName": webName, "link": webUrl}]);

            setWebUrl('');
        setWebName('');
        }

    }

    let listTechs =  useFetch('http://localhost:3000/info/listTech');


    if(!listTechs) listTechs =[];


    let options = [];

      listTechs.forEach(tech => options.push({value: tech.tech_name, label: tech.tech_name}));


    return(

        <div className="createHackathon">

                <form className="fromCreate" onSubmit={handleSubmit} method='POST'>
                    {/* Image of header article */}
                    <div id="logo">
                        Selecciona la foto principal de la portada
                        <input type="file" name="cover_picture" accept="image/*"/>
                    </div>

                    <fieldset className="fieldName">
                    <legend>Nombre || Modalidad || Ubicación</legend>

                <label>Nombre: <input type='text' name="hackathon_name" onChange={e =>setHackathon_name(e.target.value)} required/></label>

                <label>Modalidad:</label>
                <select id="hackathon_place" onChange={e => sethackathon_place(e.target.value)} required>
                        <option value="online">Online</option>
                        <option value="presencial">Presencial</option>
                        <option value="semipresencial">Semipresencial</option>
                    </select>

                <label>Ciudad: <input type='text' name="city" onChange={e =>setCity(e.target.value)} required/></label>
                </fieldset>


                <fieldset className="fieldDates">
                    <legend>Fechas de realización</legend>
                <label>Fecha inicio: <input type='date' name="start_date" onChange={e =>setStart_date(e.target.value)} required/></label>
                <label>Fecha fin: <input type='date' name="end_date" onChange={e =>setEnd_date(e.target.value)} required /></label>
                </fieldset>

                <fieldset className="fieldState">
                    <legend>Estado</legend>
                <label>Selecciona un estado: </label>
                <select id="hackathon_status" onChange={e => sethackathon_status(e.target.value)} required>
                        <option value="pendiente">Online</option>
                        <option value="realziado">Presencial</option>
                        <option value="cancelado">Semipresencial</option>
                    </select>
                </fieldset>

               <div className="techs">
                   <fieldset>
                       <legend>Tecnologías</legend>
                   <Select className="selectTechs" inputValue={otherTech} /* components={makeAnimated()}*/ isMulti options={options} onChange={handleSelected}   />
                <label> Otra: <input type='text' value={otherTech} name="other" onChange={handleOtherTech} /> </label>
                <div id="btnAddTech" onClick={handleAddOtherTech}><p>➡️</p></div>

                <div id="listTechs">
        { !(techs.length > 0) && <p>No tecnologías agregadas</p>}
        <ul>

             {techs.map(tech=> 
             <li key={tech}>{tech} </li>
             )}
        </ul>
        </div>
                   </fieldset>
               </div>
               

<div  className="links">
<fieldset id="fieldLinks">
    <legend>Enlaces</legend>
        <label id="lblWebName">Nombre web: <input value={webName} type='text' name="webName" onChange={handleWebName} placeholder="Hackathon Play"/></label>
        <label id="lblUrl">Url: <input type='text' value={webUrl}  name="url" onChange={handleWebUrl} placeholder="www.hackathonplay.com" /></label>
        {hasWeb && <span>Ya exite una url en tu lista...</span>}
        <div id="btnLink" onClick={handleListLinks}><p>➡️</p></div>
        <div id="listLinks">
        { !(links.length > 0) && <p>No hay enlaces agregados</p>}
        <ul>

             {links.map(link=> 
             <li key={link.link}>Nombre: {link.webName}, URL: {link.link} </li>
             )}
        </ul>
        </div>


        </fieldset>
</div>


<fieldset id="fieldDescription">
<legend>Descripción</legend>
<label>Temática: <input type='text' name="thematic" onChange={e =>setThematic(e.target.value)} required/></label>

                
<label>Descripción: <textarea type='text' name="hackathon_info" onChange={e =>sethackathon_info(e.target.value)} required/></label>
               
                </fieldset>


                <button type="submit">Enviar</button>
            </form>

        </div>

    );



}



export default CreateHackathon;