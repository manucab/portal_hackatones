import {  useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import "./EditHackathon.css";
import Select from "react-select";
import { useHistory, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { styleSelectPlace } from "./stylesSelect";
import { DateTime } from "luxon";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const hackathonInfo = async (idHackathon) => {
  //get current data of this hackathon
  const hData = await fetch(
    `http://localhost:3001/hackathon/${idHackathon}`
  ).then((res) => res.json());
  return hData;
};

function EditHackathon() {
  const login = useSelector((s) => s.login);
  const { idHackathon } = useParams();

  const history = useHistory();
  const today = DateTime.local().setLocale("es").toISODate();

  const [hackathon_place, sethackathon_place] = useState("");
  const [hackathon_name, setHackathon_name] = useState("");
  const [city, setCity] = useState("");
  const [start_date, setStart_date] = useState("today");
  const [end_date, setEnd_date] = useState("");
  const [hackathon_status, sethackathon_status] = useState("pendiente");
  const [hackathon_info, sethackathon_info] = useState("");
  const [thematic, setThematic] = useState([]);
  const [webName, setWebName] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [hasWeb, setHasWeb] = useState(false);
  const [techs, setTechs] = useState([]);
  const [placeIndex, setPlaceIndex] = useState(2);
  // const [optionsTech, setOptionsTech] = useState([]);

  let tech = [];

  const handleTechSelected = (newValue, actionMeta) => {
    tech = newValue.map((item) => item.value).flat();
    setTechs(tech);
  };

  const handlePlaceSelected = (newValue) => {
    findPlaceIndex = optionPlace.findIndex((x) => x.value === newValue.value);
    setPlaceIndex(findPlaceIndex);
    sethackathon_place(newValue.value);
  };

  const handleStatusSelected = (newValue) => {
    sethackathon_status(newValue.value);
  };

  const handleThematicSelected = (newValue, actionMeta) => {
    let valuesThematics = newValue.map((item) => item.value);
    setThematic([...valuesThematics]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    const logo = e.target.cover_picture.files[0];


    if(logo) { fd.append("cover_picture", logo)} 
    fd.append("place", hackathon_place.trim());
    fd.append("name", hackathon_name);
    fd.append("city", city);
    fd.append("start_date", DateTime.fromISO(start_date).plus({hour:1}).toFormat('yyyy-MM-dd  HH:mm:ss.000'));
    fd.append("end_date", DateTime.fromISO(end_date).toFormat('yyyy-MM-dd  HH:mm:ss.000'));
    fd.append("info", hackathon_info);
    fd.append("thematic", JSON.stringify(thematic));
    fd.append("techs", JSON.stringify(techs));
    fd.append("links", JSON.stringify(links));


    const headers = {
      // 'Content-Type': 'application/json',
      Authorization: login.token,
    };

    const ret = await fetch(`http://localhost:3001/user/${login.user.id}/${idHackathon}/modify`, {
        headers,
        body: fd,
        method: 'PUT'
    })

    if (ret.ok) {
        alert('¡Has modificado tu hackathon!');
        return history.push(`/user/${login.user.id}`);
    }
  };

  const handleWebName = (e) => {
    setWebName(e.target.value);
  };

  const handleWebUrl = (e) => {
    setWebUrl(e.target.value);
  };

  const handleRemoveLink = (e) => {
    setLinks(links.filter((link) => link.link !== e));
  };

  const handleListLinks = (e) => {
    const urlInList = links.map((link) => link.link).includes(webUrl);
    setHasWeb(urlInList);

    if (webUrl && webName && !urlInList) {
      setLinks([
        ...links,
        {
          link: webUrl,
          webName: webName,
        },
      ]);
      setWebUrl("");
      setWebName("");
    }
  };

  let listTechs = useFetch('http://localhost:3001/info/listTech');
  let listThematics = useFetch('http://localhost:3001/info/listThematics');

  if (! listTechs) 
      listTechs = [];
  
  if (! listThematics) 
      listThematics = [];
  
  let optionsTech = listTechs.map(tech => ({"value": tech.tech_name, "label": tech.tech_name}));

  let optionsThematics = listThematics.map((thematic) => ({
    value: thematic.thematic,
    label: thematic.thematic,
  }));
  let optionStatus = [
    {
      value: "pendiente",
      label: "Pendiente",
    },
    {
      value: "realizado",
      label: "Realizado",
    },
    {
      value: "cancelado",
      label: "Cancelado",
    },
  ];
  let optionPlace = [
    {
      value: "online",
      label: "Online",
    },
    {
      value: "presencial",
      label: "Presencial",
    },
    {
      value: "semipresencial",
      label: "Semipresencial",
    },
  ];

  //Get current info to set default values in the inputs
  let findPlaceIndex;
  let findTechsIndex = [];
  useEffect(() => {
    hackathonInfo(idHackathon).then((h) => {
      sethackathon_place(h[0].hackathon_place);
      findPlaceIndex = optionPlace.findIndex(
        (x) => x.value === h[0].hackathon_place
      );
      setPlaceIndex(findPlaceIndex);
      setHackathon_name(h[0].hackathon_name);
      setCity(h[0].city);
      setStart_date(h[0].start_date);
      setEnd_date(h[0].end_date);
      sethackathon_status(h[0].hackathon_status);
      sethackathon_info(h[0].hackathon_info);

      h[0].link.map((l) => {
        setLinks([...links, { webName: l.web_name, link: l.url }]);
      });

      setTechs(h[0].techs.map(t => t.tech))
      setThematic(h[0].thematic.split(',').map(t => t))

    });
  }, []);
  return (
    <div className="createHackathon">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Organiza un hackathon</title>
      </Helmet>

      <form className="formCreate" onSubmit={handleSubmit} method="POST">
        {/* Image of header article */}
        <div id="logo">
          Selecciona una nueva foto si quieres cambiar la portada
          <input type="file" name="cover_picture" accept="image/*"  />
        </div>

        <fieldset className="fieldName">
          <legend>Nombre || Modalidad || Ubicación</legend>

          <label>
            Nombre:
            <input
              type="text"
              name="hackathon_name"
              value={hackathon_name}
              onChange={(e) => setHackathon_name(e.target.value)}
              required
            />
          </label>

          <label>
            Modalidad:
            <Select
              id="hackathon_place"
              value={optionPlace[placeIndex]}
              theme={styleSelectPlace}
              options={optionPlace}
              onChange={handlePlaceSelected}
              required
            />
          </label>
          <label>
            Ciudad:
            <input
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
        </fieldset>

        <fieldset className="fieldDates">
          <legend>Fechas de realización</legend>
          <label>
            Fecha inicio:
            <input
              type="date"
              min={today}
              value={start_date.split("T")[0]}
              name="start_date"
              onChange={(e) => setStart_date(e.target.value)}
              required
            />
          </label>
          <label>
            Fecha fin:
            <input
              type="date"
              min={start_date}
              name="end_date"
              value={end_date.split("T")[0]}
              onChange={(e) => setEnd_date(e.target.value)}
              required
            />
          </label>
        </fieldset>

        <fieldset className="fieldState">
          <legend>Estado</legend>
          <label>Selecciona un estado:</label>
          <Select
            id="hackathon_status"
            options={optionStatus}
            defaultValue={optionStatus[0]}
            onChange={handleStatusSelected}
            isDisabled
            required
          />
        </fieldset>

        <div className="techs">
          <fieldset>
            <legend>Tecnologías</legend>
            <CreatableSelect
              className="selectTechs"
              isMulti
              value={techs.map(t => ({ label: t, value: t }))}
              options={optionsTech}
              onChange={handleTechSelected}
            />
          </fieldset>
        </div>

        <div className="links">
          <fieldset id="fieldLinks">
            <legend>Enlaces</legend>
            <div className="divLink">
              <label id="lblWebName">
                Nombre web:
                <input
                  value={webName}
                  type="text"
                  name="webName"
                  onChange={handleWebName}
                  placeholder="Hackathon Play"
                />
              </label>
              <label id="lblUrl">
                Url:
                <input
                  type="url"
                  pattern="https://.*"
                  value={webUrl}
                  name="url"
                  onChange={handleWebUrl}
                  placeholder="https://www.hackathonplay.com"
                />
              </label>
              <div id="btnLink" onClick={handleListLinks}>
                <p>➡️</p>
              </div>
            </div>
            {hasWeb && <span>Ya exite una url en tu lista...</span>}
            <div id="listLinks">
              <ul>
                {" "}
                {!(links.length > 0) && (
                  <p className="noLinks">No hay enlaces agregados</p>
                )}
                {links.map((link) => (
                  <li key={link.link}>
                    <div>
                      <span>Nombre:</span>
                      {link.webName},<br></br>
                      <span>URL:</span>
                      {link.link}{" "}
                    </div>
                    <div
                      id="btnDeleteLink"
                      onClick={() => handleRemoveLink(link.link)}
                    >
                      <p>🗑</p>
                    </div>
                  </li>
                ))}{" "}
              </ul>
            </div>
          </fieldset>
        </div>

        <fieldset id="fieldDescription">
          <legend>Descripción</legend>
          <label>Temática:</label>
          <CreatableSelect
            className="selectThematic"
            /* components={makeAnimated()}*/
            isMulti
            value={thematic.map(t => ({ label: t, value: t }))}
            options={optionsThematics}
            onChange={handleThematicSelected}
            required
          />
          <label>Descripción:</label>
          <textarea
            type="text"
            name="hackathon_info"
            value={hackathon_info}
            onChange={(e) => sethackathon_info(e.target.value)}
            required
          />
        </fieldset>

        <button id="btnSubmit" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default EditHackathon;
