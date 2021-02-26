import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import CarouselHackathons from "../CarouselHackathons/CarouselHackathons";
import ShowHackathon from "../ShowHackathon/ShowHackathon";

function HackathonsWide(props) {
  const login = useSelector((s) => s.login);
  const { id } = useParams();
  const data = useFetch(`http://localhost:3001/user/${id}`);

  if (!data) return "Loading...";
  const hackathonsJoined = data[props.index];
  const organizer = login.user.rol === "organizer";

  if (props.index === 1) {
    return (
      <div className="hackathonsJoined">
        <h1>Participaciones en hackathones</h1>

        {hackathonsJoined.length !== 0 ? (
          hackathonsJoined.map((h) => (
            <ShowHackathon hackathon={h} organizer={organizer} />
          ))
        ) : (
          <p>No te has inscrito en ningún hackathon</p>
        )}
      </div>
    );
  }
  if (props.index === 2 && organizer) {
    return (
      <div className="hackathonsCreated">
        {organizer ? <h1>Hackathones Creados</h1>: null}

        {hackathonsJoined.length !== 0 ? (
          hackathonsJoined.map((h) => (
            <ShowHackathon hackathon={h} organizer={organizer} />
          ))
        ) : (
          organizer ? <p>No has creado ningún hackathon</p>:null
        )}
      </div>
    );
  } else {
    return null
  }
}

export default HackathonsWide;
