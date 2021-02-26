import { useState } from "react";
import "./CarouselHackathons.css";
import arrow from "../../Media/Images/General/Arrow-down.svg";
import ShowHackathon from "../ShowHackathon/ShowHackathon";

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
