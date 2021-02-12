import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Logout.css';

function Logout () {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch({ type: 'logout' })
        return <Redirect to='/'/>
    }

    return (

        <div className="logout">
            <button onClick={handleLogout}>Logout</button>          

        </div>
            
    )

}

export default Logout