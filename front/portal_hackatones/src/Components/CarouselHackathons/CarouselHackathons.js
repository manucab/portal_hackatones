import { useState } from "react";
import "./CarouselHackathons.css";
import arrow from "../../Media/Images/General/Arrow-down.svg";
import ShowHackathon from "../ShowHackathon/ShowHackathon";

function CarouselHackathons({ hackathons, organizer, index }) {
  const [indexCar, setIndexCar] = useState(0);

  if (!hackathons) return "Loading...";

  const handleNext = () =>
    setIndexCar(indexCar < hackathons.length - 1 ? indexCar + 1 : indexCar + 0);
  const handlePrevious = () => setIndexCar(indexCar > 0 ? indexCar - 1 : indexCar + 0);

  let isFirst = indexCar === 0;
  let isLast = indexCar === hackathons.length - 1;

  return (
    <div className="carousel">
      <img
        id="previous"
        src={arrow}
        className={isFirst ? "off" : "on"}
        onClick={handlePrevious}
      />
      <ShowHackathon hackathon={hackathons[indexCar]} organizer={organizer} index={index}/>
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
