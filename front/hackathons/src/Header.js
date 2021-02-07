import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css'

function Header() {
  const login = useSelector(s => s.login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: 'logout' })
  }

  return (
    <header>
        <Link to="/"><div className="logo"></div></Link> 
        <h1>Portal Hackathones</h1> 


        {!login &&
            <Link className="loginButton" to="/login"><span>Sign In</span>  </Link>
        }
        {login &&
            <div>
                {login.username}
                <button onClick={handleLogout}>Logout</button>
            </div>
        }
    </header>
  );
}

export default Header;