import { useEffect } from "react"
import { useSelector } from "react-redux"
import useFetch from "../../Hooks/useFetch"
import './Avatar.css'

function Avatar () {
    
    const login = useSelector(s => s.login)
    const id = login.user.id
    const dataUser = useFetch(`http://localhost:3001/user/${id}`)
    if(!dataUser) return 'Loading...'
    const urlAvatar = dataUser[0][0].profile_picture 
    let url = `http://localhost:3001/static` + urlAvatar || 'default.png'

    return (

        <div className="avatar" style={{backgroundImage: `url(${url})`}} ></div>
            
    )

}

export default Avatar

