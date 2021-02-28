import { useState} from 'react';
import useFetch from '../../Hooks/useFetch';
import './CreateHackathon2.css';
import Select from 'react-select';
import {useHistory} from 'react-router-dom';
import CreatableSelect from "react-select/creatable";
import {styleSelectPlace} from './stylesSelect2';
import {DateTime} from "luxon";
import {Helmet} from "react-helmet";
import {useSelector} from 'react-redux';
import Modal from '../Modal/Modal';
import logoDefaultInput from '../../Media/Images/Others/avatar3.png';

function CreateHackathon() {

    const login = useSelector(s => s.login)


    const history = useHistory();
    const today = DateTime.local().setLocale('es').toISODate();

    const [hackathon_place, sethackathon_place] = useState('online');
    const [hackathon_name, setHackathon_name] = useState('');
    const [city, setCity] = useState('');
    const [start_date, setStart_date] = useState(today);
    const [end_date, setEnd_date] = useState('');
    const [hackathon_status, sethackathon_status] = useState('pendiente');
    const [hackathon_info, sethackathon_info] = useState('');
    const [thematic, setThematic] = useState([]);
    const [webName, setWebName] = useState('');
    const [webUrl, setWebUrl] = useState('');
    const [links, setLinks] = useState([]);
    const [hasWeb, setHasWeb] = useState(false);
    const [techs, setTechs] = useState([]);
    const [input, setInput] = useState(logoDefaultInput);
    const [inputBrige, setInputBridge] = useState('');
    const [isValidUrl, setIsValidUrl] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

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

    const postData =  async(e) => {

        const fd = new FormData();

        fd.append('cover_picture', inputBrige);
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


    const handleSubmit = async (e) => {

        if(hackathon_name && city && start_date && end_date && hackathon_info && thematic && links && techs && inputBrige ){
            console.log('Estan todos los campos rellenos');
          await  postData(e);
        }else{
            console.log('No estan correctos');
        }
        
        setIsSubmit(true);
    }

    const handleWebName = e => {
      setWebName(e.target.value);
    }

    const handleWebUrl = e => {

//  (e.target.validity.valid) ? (setIsValidUrl(true)) : setIsValidUrl(false);
setWebUrl(e.target.value);

 if(e.target.validity.valid){ 
     setIsValidUrl(true);
    }else{
        setIsValidUrl(false)
     }

    }

    const handleRemoveLink = e => {
        console.log('start_date :>> ', DateTime.fromISO(start_date).plus({hour: 1}).toFormat('yyyy-MM-dd  HH:mm:ss.000'));
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

        if (webUrl && webName &&  isValidUrl && ! urlInList) {

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

    const handleFiles = e => {

        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = function () {
            setInput(reader.result)
            setInputBridge(e.target.files[0])
        }
    }

    return (<div className="createHackathonPage">

        <div className="createHackathon">

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
        login && login.user.rol !== 'organizer' && < Modal title = "No autorizado"
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

    <div className="formCreate" 
        // onSubmit={()=>handleSubmit()}
        >

        <h2>Rellena el formulario</h2>

        {/* Image of header article */}
        <div id="logoInputCreate" >
            <div className="logoPreview">
                <img src={input}
                    alt='logo'/>
            </div>
            <div className="inputFileLogo">
                <span>Seleciona imagen de portada</span>
                <label required htmlFor="imageUpload" className="hvr-shutter-out-horizontal">Examinar...</label>
                <input type="file" name="cover_picture" id="imageUpload"
                        onChange={handleFiles}
                        accept="image/*"
                        required/>
   {!inputBrige && isSubmit && <span class="tip up">Este campo necesario</span>}

            </div>

        </div>

        <fieldset className="fieldName fieldCommon">
            <legend>Nombre y ciudad</legend>

            {!hackathon_name && isSubmit && <span id="toolTipName" class="tip down">Este campo necesario</span>}

            <label htmlFor="hackathon_name">Nombre</label>
           
            <input type='text' name="hackathon_name" id="hackathon_name" pattern="[a-zA-Z ]{2,30}" className="inputSelectSame"

                onKeyPress={handleEnterPrevent}

                onChange={
                    e => setHackathon_name(e.target.value)
                }
                required/>

{!city && isSubmit && <span id="toolTipCity" class="tip down">Este campo necesario</span>}

            <label htmlFor="city">Ciudad</label>

            <input type='text' name="city" pattern="[a-zA-Z ]{2,30}"
                  id="city"
                  onChange={
                        e => setCity(e.target.value)
                    }
                    onKeyPress={handleEnterPrevent}
                    className="inputSelectSame"
                    required/>

        </fieldset>

        <fieldset className="fieldModality fieldCommon">
            <legend>Modalidad</legend>

                <Select id="hackathon_place"
                    theme={styleSelectPlace}
                    options={optionPlace}
                    defaultValue={
                        optionPlace[0]
                    }
                    onChange={handlePlaceSelected}
                    required/>
        </fieldset>

        <fieldset className="fieldDate fieldCommon">
            <legend>Fechas de realización</legend>
          
{!start_date && isSubmit && <span id="toolTipStartDate" class="tip down">Este campo necesario</span>}

<div className="datesDiv" >

<label id="lblStartDate" htmlFor="inputStartDate">Fecha inicio</label>
            <input type='date'
            id="inputStartDate"
                    min={today}
                    // defaultValue={today}
                    name="start_date"
                    onKeyPress={handleEnterPrevent}
                    className="inputSelectSame"
                    onChange={
                        e => setStart_date(e.target.value)
                    }
                    required/>
{!end_date && isSubmit && <span id="toolTipEndDate" class="tip down">Este campo necesario</span>}

            <label id="lblEndDate" htmlFor="inputEndDate">Fecha fin</label>
            <input type='date'
            id="inputEndDate"

                    min={start_date}
                    name="end_date"
                    onKeyPress={handleEnterPrevent}
                    className="inputSelectSame"
                    onChange={
                        e => setEnd_date(e.target.value)
                    }
                    required/>
</div>

        </fieldset>

        <fieldset className="fieldState fieldCommon">
            <legend>Estado</legend>

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
            <fieldset className="fieldTech fieldCommon">
                <legend>Tecnologías</legend>
            {techs.length<1 && isSubmit && <span id="toolTipTechs" class="tip down">Este campo necesario</span>}
                
                <CreatableSelect className="selectTechs" isMulti
                    options={optionsTech}
                    theme={styleSelectPlace}
                    onChange={handleTechSelected}/>
            </fieldset>
        </div>

        <div className="links">
            <fieldset id="fieldLinks" className="fieldLinks fieldCommon">
                <legend>Enlaces</legend>
                <div className="divLinkUrl">
                    <label htmlFor="webNameInput" id="lblWebName">Nombre web</label>
                    <input value={webName}
                        id="webNameInput"
                            pattern="[a-zA-Z ]{2,30}"
                            onKeyPress={handleEnterPrevent}
                            className="inputSelectSame"
                            type='text'
                            name="webName"
                            onChange={handleWebName}
                            placeholder="Hackathon Play"/>
                    <label id="lblUrl" htmlFor="urlNameInput">Url</label>
                    <input type='url' pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
                            id="urlNameInput"
                            value={webUrl}
                            name="url"
                            className="inputSelectSame"
                            onKeyPress={handleEnter}
                            onChange={handleWebUrl}
                            placeholder="https://www.hackathonplay.com"/>
                    <div  className="hvr-shutter-out-horizontal btnLink" id="btnLinkUrl"
                        onClick={handleListLinks}>
                        Añadir
                    </div>
                </div>
                {
                hasWeb && <span>Ya exite una url en tu lista...</span>
            }
                <div id="listLinks" ref={links} >
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
            {links.length<1 && isSubmit && <span id="toolTipLinks" class="tip down">Este campo necesario</span>}

            </fieldset>
        </div>

        <fieldset id="fieldDescription" className="fieldDescription fieldCommon">
            <legend>Descripción</legend>
            <label>Temática:
            </label>
            {thematic.length<1 && isSubmit && <span id="toolTipThematic" class="tip down">Este campo necesario</span>}
            <CreatableSelect className="selectThematic"
                /* components={makeAnimated()}*/
                theme={styleSelectPlace}

                isMulti
                options={optionsThematics}
                onChange={handleThematicSelected}
                required/>
            <label>Descripción:
            </label>
            {!hackathon_info && isSubmit && <span id="toolTipHackathonInfo" class="tip down">Este campo necesario</span>}
            <textarea type='text' name="hackathon_info"
                onChange={
                    e => sethackathon_info(e.target.value)
                }
                onKeyPress={handleEnterPrevent}
                className="inputSelectSame"

                required/>

        </fieldset>

        <div className="hvr-shutter-out-horizontal" id="btnSubmitCreate" onClick={e=>handleSubmit(e)}>Enviar</div>
    </div>

</div></div>);

}

export default CreateHackathon;
