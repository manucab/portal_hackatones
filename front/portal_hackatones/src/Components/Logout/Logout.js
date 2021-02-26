import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Logout.css';



function Logout () {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch({ type: 'logout' })
        return history.push('/')
    }

    return (

        <div className="logout">
            <button onClick={handleLogout}>Logout</button>          

        </div>
            
    )

}

export default Logout