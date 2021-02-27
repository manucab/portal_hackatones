import "./Home.css";
import { useHistory } from "react-router-dom";
import landing from "./images/Landing.jpg";
import MediaQuery from "react-responsive";

function Home() {
  const history = useHistory();

  return (
    <div className="home">
      {/* Header landing page */}
      <MediaQuery maxWidth={767}>
        <div
          className="landing-img"
          style={{ backgroundImage: `url(${landing})` }}
        >
          <p>
            ¿Quieres participar en un hackathon? Regístrate y empieza una
            aventura sin fin
          </p>
          <div className="landing-buttons">
            <button
              id="btnRegister"
              value="/register"
              onClick={(e) => history.push(e.target.value)}
            >
              Regístrate
            </button>
            <button
              id="btnSearch"
              value="/hackathon/search/"
              onClick={(e) => history.push(e.target.value)}
            >
              Buscar hackathones
            </button>
            <button
              id="btnOrganizer"
              value="/createhackathon"
              onClick={(e) => history.push(e.target.value)}
            >
              Organizar hackathones
            </button>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={768}>
      <div
          className="landing-img"
          style={{ backgroundImage: `url(${landing})` }}
        >
          <p>
            ¿Quieres participar en un hackathon? Regístrate y empieza una
            aventura sin fin
          </p>
          <div className="landing-buttons">
            <button
              id="btnRegister"
              value="/register"
              onClick={(e) => history.push(e.target.value)}
            >
              Regístrate
            </button>
            <button
              id="btnSearch"
              value="/hackathon/search/"
              onClick={(e) => history.push(e.target.value)}
            >
              Buscar hackathones
            </button>
            <button
              id="btnOrganizer"
              value="/createhackathon"
              onClick={(e) => history.push(e.target.value)}
            >
              Organizar hackathones
            </button>
          </div>
        </div>
      </MediaQuery>
    </div>
  );
}

export default Home;
