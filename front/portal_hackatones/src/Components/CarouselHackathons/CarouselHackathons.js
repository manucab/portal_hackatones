import { useState } from "react";
import "./CarouselHackathons.css";
import arrow from "../../Media/Images/General/Arrow-down.svg";
import { DateTime } from "luxon";
import Modal from "../Modal/Modal";
import StarRating from "../StarRating/StarRating";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function ShowHackathon({ hackathon: h, organizer }) {
  const [show, setShow] = useState(false);
  const [deleteHackathon, setDeleteHackathon] = useState(false);
  const [cancelBooking,setCancelBooking] = useState(false)
  const login = useSelector((s) => s.login);
  const history = useHistory();

  console.log(organizer);

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

  return (
    <div className="hackathon">
      <h1>{h.hackathon_name}</h1>
      <div>Formato: {h.hackathon_place}</div>
      <div>Ciudad: {h.city}</div>
      <div>Fecha Inicio: {h.start_date.split("T")[0]}</div>
      <div>Fecha Final: {h.end_date.split("T")[0]}</div>
      <div>Tecnologías: {h.techs}</div>
      <div>Estado Hackathon: {h.hackathon_status}</div>
      <div>
        {!hasEnded && (
          <div className="timeTo">
            {daysTo > 1 ? `Quedan ${daysTo} días!!!` : `Queda 1 día!!!`}
          </div>
        )}
      </div>
      <div>
        {!organizer && !hasEnded ? (
          <div>
            <button className="delete-hack" onClick={() => setCancelBooking(true)}>
              Cancelar Inscripción
            </button>
            <Modal
              title="Eliminar Hackathon"
              show={cancelBooking}
              onClose={() => setCancelBooking(false)}
            >
              <div className="delete-hackathon-warning">
                Estás seguro de que quieres cancelar tu inscripción en este hackathon?
              </div>
              <button
                className="delete-hackathon-button"
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
        {organizer ? (
          <div className="participants">
            <div>{h.participants || "-"}</div>
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
        ) : organizer ? (
          <div>
            <button
              className="modify-hack"
              onClick={() =>
                history.push(`/user/${login.user.id}/${h.id}/modify`)
              }
            >
              Modificar
            </button>
            <button className="delete-hack" onClick={() => setDeleteHackathon(true)}>
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

function CarouselHackathons({ hackathons, organizer }) {
  const [index, setIndex] = useState(0);

  if (!hackathons) return "Loading...";

  const handleNext = () =>
    setIndex(index < hackathons.length - 1 ? index + 1 : index + 0);
  const handlePrevious = () => setIndex(index > 0 ? index - 1 : index + 0);

  let isFirst = index === 0;
  let isLast = index === hackathons.length - 1;

  return (
    <div className="carousel">
      <img
        id="previous"
        src={arrow}
        className={isFirst ? "off" : "on"}
        onClick={handlePrevious}
      />
      <ShowHackathon hackathon={hackathons[index]} organizer={organizer} />
      <img
        id="next"
        src={arrow}
        className={isLast ? "off" : "on"}
        onClick={handleNext}
      />
    </div>
  );
}

export default CarouselHackathons;
