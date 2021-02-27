import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import "./OrganizerStats.css";

function showOrganizerStats(data) {
  return (
    <div className="stats-section">
      <div className="stats">
        <div className="stat">{data[4][0][0].created_hackathons}</div>
        <div>Creados</div>
      </div>
      <div className="stats">
        <div className="stat">{data[4][2][0].avg_participants}</div>
        <div>Media Asistentes</div>
      </div>
      <div className="stats">
        <div className="stat">{data[4][1][0].organizer_avg_rate || "-"}</div>
        <div>Valoración Media</div>
      </div>
    </div>
  );
}

function OrganizerStats() {
  const login = useSelector((s) => s.login);
  const { id } = useParams();
  const data = useFetch(`http://localhost:3001/user/${id}`);

  if (!data) return "Loading...";
  if (!login) return <Redirect to="/" />;
  if (login.user.rol !== "organizer")
    return <div className="organizer-stats-section"></div>;

  return (
    <div className="organizer-stats-section">
      <h1>Tus estadísticas como organizador</h1>
      {showOrganizerStats(data)}
    </div>
  );
}

export default OrganizerStats;
