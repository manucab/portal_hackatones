import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import useFetch from "../../Hooks/useFetch"
import './Avatar.css'

function Avatar () {
    
    const login = useSelector(s => s.login)
    const id = login.user.id
    const dataUser = useFetch(`http://localhost:3001/user/${id}`)



    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch({ type: 'logout' })
        return history.push('/')
    }

    if(!dataUser) return 'Loading...';

    if(dataUser.info) (handleLogout());
    
    const urlAvatar = dataUser[0][0].profile_picture 
    let url = `http://localhost:3001/static` + urlAvatar || 'default.png'

    return (

        <div className="avatar" style={{backgroundImage: `url(${url})`}} ></div>
            
    )

}

export default Avatar

