import {Link} from 'react-router-dom';
import './Footer.css'
import logoHome from '../../Media/Images/General/logo.jpg';
import logoBlog from '../../Media/Images/General/blogLogo.png';
import logoHackathon from '../../Media/Images/General/codeLogo.svg';
import logoAbout from '../../Media/Images/General/about.svg';

function Footer() {

    return (
        <footer className="footer">
            <div>
                <Link to="/" className="logoFooter">

                    <img id="homeButton"
                        src={logoHome}
                        alt="home-logo"/>
                    <span>Inicio</span>
                </Link>
            </div>

            <div>
                <Link to="/hackathons" className="logoFooter">
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


        </footer>
    );
}

export default Footer;
