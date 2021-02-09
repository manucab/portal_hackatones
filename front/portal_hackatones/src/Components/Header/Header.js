import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import './Header.css'

function Header() {
  const login = useSelector(s => s.login)
  const dispatch = useDispatch()
  const id = login ? login.id:0
  const profileUrl = `/user/${id}`
  

  return (
    <header>
        <Link to="/"><div className="logo"></div></Link> 
        <h1>Portal Hackathones</h1> 


        {!login &&
            <Link className="loginButton" to="/login"><span>Sign In</span>  </Link>
        }
        {login &&
            <div className="loginSection">
                {login.username}
                <Link to={profileUrl} > <div>{login.email}</div> </Link>
            </div>
        }
    </header>
  );
}

export default Header;