import { useState} from 'react';
import useFetch from '../../Hooks/useFetch';
import './CreateHackathon.css';
import Select from 'react-select';
import {useHistory} from 'react-router-dom';
import CreatableSelect from "react-select/creatable";
import {styleSelectPlace} from './stylesSelect';
import {DateTime} from "luxon";
import {Helmet} from "react-helmet";
import {useSelector} from 'react-redux';
import Modal from '../Modal/Modal';

function CreateHackathon() {

    const login = useSelector(s => s.login)


    const history = useHistory();
    const today = DateTime.local().setLocale('es').toISODate();

    const [hackathon_place, sethackathon_place] = useState('online');
    const [hackathon_name, setHackathon_name] = useState('');
    const [city, setCity] = useState('');
    const [start_date, setStart_date] = useState('today');
    const [end_date, setEnd_date] = useState('');
    const [hackathon_status, sethackathon_status] = useState('pendiente');
    const [hackathon_info, sethackathon_info] = useState('');
    const [thematic, setThematic] = useState([]);
    const [webName, setWebName] = useState('');
    const [webUrl, setWebUrl] = useState('');
    const [links, setLinks] = useState([]);
    const [hasWeb, setHasWeb] = useState(false);
    const [techs, setTechs] = useState([]);

    let tech = [];


    const handleTechSelected = (newValue, actionMeta) => {
        tech = newValue.map(item => item.value).flat();
        setTechs(tech);
    }

    const handlePlaceSelected = (newValue) => {
        sethackathon_place(newValue.value);
    }


    const handleStatusSelected = (newValue) => {
        sethackathon_status(newValue.value);
    }

    const handleThematicSelected = (newValue, actionMeta) => {
        let valuesThematics = newValue.map(item => item.value);
        setThematic([...valuesThematics]);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const fd = new FormData();
        const logo = e.target.cover_picture.files[0];

        fd.append('cover_picture', logo);
        fd.append('hackathon_place', hackathon_place);
        fd.append('hackathon_name', hackathon_name);
        fd.append('city', city);
        fd.append('start_date', DateTime.fromISO(start_date).plus({hour: 1}).toFormat('yyyy-MM-dd  HH:mm:ss.000'));
        fd.append('end_date', DateTime.fromISO(end_date).toFormat('yyyy-MM-dd  HH:mm:ss.000'));
        fd.append('hackathon_status', hackathon_status);
        fd.append('hackathon_info', hackathon_info);
        fd.append('thematic', JSON.stringify(thematic));
        fd.append('techs', JSON.stringify(techs));
        fd.append('links', JSON.stringify(links));

        const headers = { // 'Content-Type': 'application/json',
            'Authorization': login.token
        }

        const ret = await fetch('http://localhost:3001/createhackathon', {
            headers,
            body: fd,
            method: 'POST'
        })

        if (! ret.ok) {
                return (<div> {

                    < Modal title = "Oppssss ha ocurrido un problema con su registro"
                    show = {
                        ! ret.ok
                    }
                    onClose = {
                        () => history.push('/')
                    }
                    children = {
                        ret.Info
                    } >
                </Modal>} </div>
            )

        }

        if (ret.ok) {
            alert('¡Felicidades, has creado un hackathon!');
            return history.push(`/user/${
                login.user.id
            }`);
        }
    }

    const handleWebName = e => {
        setWebName(e.target.value);
    }

    const handleWebUrl = e => {
        setWebUrl(e.target.value);
    }

    const handleRemoveLink = e => {
        setLinks(links.filter(link => link.link !== e))
    }


    const handleEnterPrevent = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleListLinks(e);
        }
    }

    const handleListLinks = e => {

        const urlInList = links.map(link => link.link).includes(webUrl);
        setHasWeb(urlInList);

        if (webUrl && webName && ! urlInList) {

            setLinks([
                ...links, {
                    "link": webUrl,
                    "webName": webName
                }
            ]);
            setWebUrl('');
            setWebName('');
        }

    }

    let listTechs = useFetch('http://localhost:3001/info/listTech');
    let listThematics = useFetch('http://localhost:3001/info/listThematics');

    if (! listTechs) 
        listTechs = [];
    


    if (! listThematics) 
        listThematics = [];
    


    let optionsTech = listTechs.map(tech => ({"value": tech.tech_name, "label": tech.tech_name}));
    let optionsThematics = listThematics.map(thematic => ({"value": thematic.thematic, "label": thematic.thematic}));
    let optionStatus = [
        {
            "value": 'pendiente',
            "label": 'Pendiente'
        }, {
            "value": 'realizado',
            "label": 'Realizado'
        }, {
            "value": 'cancelado',
            "label": 'Cancelado'
        }
    ]
    let optionPlace = [
        {
            "value": 'online',
            "label": 'Online'
        }, {
            "value": 'presencial',
            "label": 'Presencial'
        }, {
            "value": 'semipresencial',
            "label": 'Semipresencial'
        }
    ]



    return (<div className="createHackathon">

        {
        ! login && < Modal title = "No autorizado"
        show = {
            ! login
        }
        onClose = {
            () => history.push('/')
        }
        children = {
            'Necesitas iniciar sesion para organizar un hackathon'
        } >
    </Modal>}


    {
        login && login.user.rol!=='organizer' && < Modal title = "No autorizado"
        show = {
             login
        }
        onClose = {
            () => history.push('/')
        }
        children = {
            'Debes de ser un usuario de tipo organizador'
        } >
    </Modal>}


    <Helmet>
        <meta charSet="utf-8"/>
        <title>Organiza un hackathon</title>
    </Helmet>

    <form className="formCreate" action="#"
        onSubmit={handleSubmit}
        method='POST'>
        {/* Image of header article */}
        <div id="logo">
            Selecciona la foto principal de la portada
            <input type="file" name="cover_picture" accept="image/*" required/>
        </div>

        <fieldset className="fieldName">
            <legend>Nombre || Modalidad || Ubicación</legend>

            <label>Nombre:
                <input type='text' name="hackathon_name" pattern="[a-zA-Z ]{2,30}"


                    onKeyPress={handleEnterPrevent}

                    onChange={
                        e => setHackathon_name(e.target.value)
                    }
                    required/></label>

            <label>Modalidad:
                <Select id="hackathon_place"
                    theme={styleSelectPlace}
                    options={optionPlace}
                    defaultValue={
                        optionPlace[0]
                    }
                    onChange={handlePlaceSelected}
                    required/>
            </label>
            <label>Ciudad:
                <input type='text' name="city" pattern="[a-zA-Z ]{2,30}"
                    onChange={
                        e => setCity(e.target.value)
                    }
                    onKeyPress={handleEnterPrevent}

                    required/></label>
        </fieldset>


        <fieldset className="fieldDates">
            <legend>Fechas de realización</legend>
            <label>Fecha inicio:
                <input type='date'
                    min={today}
                    defaultValue={today}
                    name="start_date"
                    onKeyPress={handleEnterPrevent}

                    onChange={
                        e => setStart_date(e.target.value)
                    }
                    required/></label>
            <label>Fecha fin:
                <input type='date'
                    min={start_date}
                    name="end_date"
                    onKeyPress={handleEnterPrevent}

                    onChange={
                        e => setEnd_date(e.target.value)
                    }
                    required/></label>
        </fieldset>

        <fieldset className="fieldState">
            <legend>Estado</legend>
            <label>Selecciona un estado:
            </label>
            <Select id="hackathon_status"
                options={optionStatus}
                defaultValue={
                    optionStatus[0]
                }
                onChange={handleStatusSelected}
                isDisabled
                required/>
        </fieldset>

        <div className="techs">
            <fieldset>
                <legend>Tecnologías</legend>
                <CreatableSelect className="selectTechs" isMulti
                    options={optionsTech}
                    onChange={handleTechSelected}/>
            </fieldset>
        </div>


        <div className="links">
            <fieldset id="fieldLinks">
                <legend>Enlaces</legend>
                <div className="divLink">
                    <label id="lblWebName">Nombre web:
                        <input value={webName}
                            pattern="[a-zA-Z ]{2,30}"
                            onKeyPress={handleEnterPrevent}

                            type='text'
                            name="webName"
                            onChange={handleWebName}
                            placeholder="Hackathon Play"/></label>
                    <label id="lblUrl">Url:
                        <input type='url' pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
                            value={webUrl}
                            name="url"
                            onKeyPress={handleEnter}
                            onChange={handleWebUrl}
                            placeholder="https://www.hackathonplay.com"/></label>
                    <div id="btnLink"
                        onClick={handleListLinks}>
                        <p>➡️</p>
                    </div>
                </div>
                {
                hasWeb && <span>Ya exite una url en tu lista...</span>
            }
                <div id="listLinks">
                    <ul> {
                        !(links.length > 0) && <p className="noLinks">No hay enlaces agregados</p>
                    }
                        {
                        links.map(link => <li key={
                            link.link
                        }>
                            <div>
                                <span>Nombre:
                                </span>
                                {
                                link.webName
                            },
                                <span>URL:
                                </span>
                                {
                                link.link
                            } </div>
                            <div id="btnDeleteLink"
                                onClick={
                                    () => handleRemoveLink(link.link)
                            }>
                                <p>🗑</p>
                            </div>
                        </li>)
                    } </ul>
                </div>
            </fieldset>
        </div>

        <fieldset id="fieldDescription">
            <legend>Descripción</legend>
            <label>Temática:
            </label>
            <CreatableSelect className="selectThematic"
                /* components={makeAnimated()}*/
                isMulti
                options={optionsThematics}
                onChange={handleThematicSelected}
                required/>
            <label>Descripción:
            </label>
            <textarea type='text' name="hackathon_info"
                onChange={
                    e => sethackathon_info(e.target.value)
                }
                onKeyPress={handleEnterPrevent}

                required/>

        </fieldset>

        <button id="btnSubmit" type="submit">Enviar</button>
    </form>

</div>);

}

export default CreateHackathon;
