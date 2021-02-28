import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import "./Header.css";
import MediaQuery from "react-responsive";
import logoHome from '../../Media/Images/General/logo.jpg';
import logoBlog from '../../Media/Images/Others/blogger4.png';
import logoHackathon from '../../Media/Images/General/codeLogo.svg';
import logoAbout from '../../Media/Images/General/about.svg';

function Header() {
  const login = useSelector((s) => s.login);
  const id = login ? login.user.id : null;
  const profileUrl = `/user/${id}`;

  return (
    <header>
      <MediaQuery maxWidth={767}>
        <Link to="/">
          <div className="logo"></div>
        </Link>
        <h1>Hackathons Place</h1>

        {!login && (
          <Link className="loginButton" to="/login">
            <span>Sign In</span>{" "}
          </Link>
        )}
        {login && (
          <div className="loginSection">
            <Link to={profileUrl}>
              {" "}
              <Avatar />{" "}
            </Link>
          </div>
        )}
      </MediaQuery>
      <MediaQuery minWidth={768}>
        <Link to="/">
          <div className="logo"></div>
        </Link>
        <div>
                <Link to="/hackathon/search" className="logoFooter">
                    <img id="hackathonsButton"
                        src={logoHackathon}
                        alt="hackathon-logo"/>
                    <span>Hackatones</span>

                </Link>
            </div>

            <div>
                <Link to="/blog" className="logoFooter">
                    <img id="hackathonsButton"
                        src={logoBlog}
                        alt="blog-logo"/>
                    <span>Blog</span>
                </Link>
            </div>

            <div>
                <Link to="/about" className="logoFooter">
                    <img id="hackathonsButton"
                        src={logoAbout}
                        alt="about-logo"/>
                    <span>Nosotros</span>
                </Link>
            </div>
        
        {!login && (
          <Link className="loginButton" to="/login">
            <span>Sign In</span>{" "}
          </Link>
        )}
        {login && (
          <div className="loginSection">
            <Link to={profileUrl}>
              {" "}
              <Avatar />{" "}
            </Link>
          </div>
        )}
      </MediaQuery>
    </header>
  );
}

export default Header;
