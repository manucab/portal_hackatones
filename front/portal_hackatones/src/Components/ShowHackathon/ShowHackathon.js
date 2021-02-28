import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DateTime } from "luxon";
import Modal from "../Modal/Modal";
import StarRating from "../StarRating/StarRating";
import "./ShowHackathon.css";

function ShowHackathon({ hackathon: h, organizer, index }) {
  const [show, setShow] = useState(false);
  const [deleteHackathon, setDeleteHackathon] = useState(false);
  const [cancelBooking, setCancelBooking] = useState(false);
  const login = useSelector((s) => s.login);
  const history = useHistory();

  const url =
    `http://localhost:3001/static/` + h.cover_picture || "default.png";
  const startYear = h.start_date.split("-")[0];
  const startMonth = h.start_date.split("-")[1];
  const startDay = h.start_date.split("-")[2].split("T")[0];
  const startDateFormated = DateTime.fromISO(
    `${startYear}-${startMonth}-${startDay}`
  );
  const daysTo =
    parseInt(startDateFormated.diffNow("days").toObject().days) + 1;
  const hasEnded = h.hackathon_status === "realizado";
  const isRated = hasEnded && h.rate !== null;
  const ableToRate = hasEnded && !isRated;
  const isRanked = h.ranking !== null && h.ranking !== undefined;

  const handleClose = (e) => {
    setShow(false);
  };

  const handleDelete = async (e) => {
    const headers = {
      //   "Content-Type": "application/json",
      Authorization: login.token,
    };

    const ret = await fetch(
      `http://localhost:3001/user/${login.user.id}/${h.id}/delete`,
      {
        headers,
        method: "PUT",
      }
    );

    if (ret.status === 200) {
      alert("¡Has eliminado este hackathon!");
      window.location.reload();
    }
  };

  const handleCancel = async (e) => {
    const headers = {
      //   "Content-Type": "application/json",
      Authorization: login.token,
    };

    const ret = await fetch(
      `http://localhost:3001/user/${login.user.id}/${h.id}/cancelBooking`,
      {
        headers,
        method: "PUT",
      }
    );

    if (ret.status === 200) {
      alert("¡Has cancelado tu participación!");
      window.location.reload();
    }
  };

  console.log(h.cover_picture);
  return (
    <div className="hackathon">
      <div className="cover-picture" style={{backgroundImage:`url(${url})`}}></div>
      <h1>{h.hackathon_name}</h1>
      <div className="hackathon-info-section">
        <div>
          <strong> Formato: </strong>
          {h.hackathon_place}
        </div>
        <div>
          <strong>Ciudad: </strong>
          {h.city}
        </div>
        <div>
          <strong>Fecha Inicio:</strong> {h.start_date.split("T")[0]}
        </div>
        <div>
          <strong>Fecha Final:</strong> {h.end_date.split("T")[0]}
        </div>
        <div>
          <strong>Tecnologías: </strong>
          {h.techs}
        </div>
        <div>
          <strong>Estado Hackathon:</strong> {h.hackathon_status}
        </div>
      </div>
      <div className="timeToContainer">
        {!hasEnded && (
          <div className="timeTo">
            {daysTo > 1 ? `Quedan ${daysTo} días!!!` : `Queda 1 día!!!`}
          </div>
        )}
      </div>
      <div>
        {index===1 && !hasEnded ? (
          <div>
            <button
              className="cancel-hack"
              onClick={() => setCancelBooking(true)}
            >
              Cancelar Inscripción
            </button>
            <Modal
              title="Eliminar Hackathon"
              show={cancelBooking}
              onClose={() => setCancelBooking(false)}
            >
              <div className="delete-hackathon-warning">
                Estás seguro de que quieres cancelar tu inscripción en este
                hackathon?
              </div>
              <button
                className="cancel-hackathon-button"
                onClick={handleCancel}
              >
                Cancelar Inscripción
              </button>
            </Modal>
          </div>
        ) : null}
      </div>
      <div className="hackathon-results">
        {isRanked && <div className="ranking">{h.ranking}º </div>}
        <div className="rate">
          {isRated && !organizer ? (
            <div className="rate-box"> {h.rate} ⭐</div>
          ) : (
            ableToRate && (
              <div className="rate-modal">
                <button onClick={() => setShow(true)}>Valorar</button>
              </div>
            )
          )}
        </div>
        <Modal
          title="Valorar evento"
          show={show}
          onClose={() => setShow(false)}
        >
          <StarRating handleClose={handleClose} idHackathon={h.id} />
        </Modal>
      </div>

      <div className="hackathon-stats">
        {organizer && index === 2 ? (
          <div className="participants">
            <div className="participants-number">{h.participants || "-"}</div>
            <div>
              {h.hackathon_status === "realizado"
                ? "Participantes"
                : "Inscritos"}
            </div>
          </div>
        ) : null}

        {h.hackathon_status === "realizado" && organizer ? (
          <div className="avg-rate">
            <div>{h.avg_rate || "-"}</div>
            <div>Valoración</div>
          </div>
        ) : organizer && index === 2 ? (
          <div>
            <button
              className="modify-hack"
              onClick={() =>
                history.push(`/user/${login.user.id}/${h.id}/modify`)
              }
            >
              Modificar
            </button>
            <button
              className="delete-hack"
              onClick={() => setDeleteHackathon(true)}
            >
              X
            </button>
            <Modal
              title="Eliminar Hackathon"
              show={deleteHackathon}
              onClose={() => setDeleteHackathon(false)}
            >
              <div className="delete-hackathon-warning">
                Estás seguro de que quieres eliminar este hackathon? <br></br>
                No habrá vuelta atrás y se cancelarán todas las inscripciones
              </div>
              <button
                className="delete-hackathon-button"
                onClick={handleDelete}
              >
                Eliminar hackathon
              </button>
            </Modal>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ShowHackathon;
