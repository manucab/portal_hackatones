import { Link } from "react-router-dom";
import "./Footer.css";
import logoHome from "../../Media/Images/General/logo.jpg";
import logoBlog from "../../Media/Images/General/blogLogo.png";
import logoHackathon from "../../Media/Images/General/codeLogo.svg";
import logoAbout from "../../Media/Images/General/about.svg";
import MediaQuery from "react-responsive";

function Footer() {
  return (
    <footer className="footer">
      <MediaQuery maxWidth={767}>
        <div>
          <Link to="/" className="logoFooter">
            <img id="homeButton" src={logoHome} alt="home-logo" />
            <span>Inicio</span>
          </Link>
        </div>

        <div>
          <Link to="/hackathon/search" className="logoFooter">
            <img
              id="hackathonsButton"
              src={logoHackathon}
              alt="hackathon-logo"
            />
            <span>Hackatones</span>
          </Link>
        </div>

        <div>
          <Link to="/blog" className="logoFooter">
            <img id="hackathonsButton" src={logoBlog} alt="blog-logo" />
            <span>Blog</span>
          </Link>
        </div>

        <div>
          <Link to="/about" className="logoFooter">
            <img id="hackathonsButton" src={logoAbout} alt="about-logo" />
            <span>Nosotros</span>
          </Link>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={768}>
        <div className="footer-container-wide">
          <div>
            <Link to="/" id="logoFooter-wide">
              <img id="homeButton" src={logoHome} alt="home-logo" />
            </Link>
          </div>
          <div className="footer-links-wide">
            <div className="footer-link-wide">
              <Link to="/hackathon/search" className="logoFooter">
                <span>Hackatones</span>
              </Link>
            </div>
            <div className="footer-link-wide">
              <Link to="/blog" className="logoFooter">
                <span>Blog</span>
              </Link>
            </div>
            <div className="footer-link-wide">
              <Link to="/about" className="logoFooter">
                <span>About</span>
              </Link>
            </div>
            <div className="copyright">
              <span>
                © December 2020 Unity Hackathons S.L.U. Todos los derechos
                reservados.
              </span>
            </div>
          </div>
        </div>
      </MediaQuery>
    </footer>
  );
}

export default Footer;
