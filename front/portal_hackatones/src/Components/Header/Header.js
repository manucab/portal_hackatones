import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import './Header.css'

function Header() {
  const login = useSelector(s => s.login)
  const id = login ? login.user.id:null
  const profileUrl = `/user/${id}`
  

  return (
    <header>
        <Link to="/"><div className="logo"></div></Link> 
        <h1>Hackathons Place</h1> 


        {!login &&
            <Link className="loginButton" to="/login"><span>Sign In</span>  </Link>
        }
        {login &&
            <div className="loginSection">
                <Link to={profileUrl} > <Avatar/> </Link>
            </div>
        }
    </header>
  );
}

export default Header;