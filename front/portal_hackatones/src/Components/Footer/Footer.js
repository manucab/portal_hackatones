import { Link } from 'react-router-dom';
import './Footer.css'

function Footer() {

  return (
    <Footer>
      <div >
        <Link to="/"><div className="logoFooter"></div></Link> 
        <span>Inicio</span>
      </div>

      <div >
        <Link to="/hackathons"><div className="logoFooter"></div></Link> 
        <span>Hackatones</span>
      </div>

      <div >
        <Link to="/blog"><div className="logoFooter"></div></Link> 
        <span>Blog</span>
      </div>

      <div >
        <Link to="/about"><div className="logoFooter"></div></Link> 
        <span>Nosotros</span>
      </div>
         

    </Footer>
  );
}

export default Footer;