import "./Home.css";
import CarouselHackathons from "../CarouselHackathons3/CarouselHackathons";
import { DateTime } from "luxon";
import useFetch from "../../Hooks/useFetch";
import { useHistory } from "react-router-dom";
import landing from "./images/Landing.jpg";
import landingPhone from "./images/landing-phone.jpeg"
import MediaQuery from "react-responsive";

function Home() {
  const history = useHistory();
  const today = DateTime.local().setLocale("es").toISODate();

  let hackathonsRes = useFetch(
    "http://localhost:3001/hackathon/search" + `?start_date=${today}`
  );

  if (!hackathonsRes) return "Loading...";

  const hasHackathon = hackathonsRes && !hackathonsRes.Info ? true : false;

  let hackathons ='';
if(hasHackathon){
  // Show only 10 next hackathons
   hackathons = hackathonsRes.slice(0, 10);
}


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
