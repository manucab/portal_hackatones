import { useEffect } from "react"
import { useSelector } from "react-redux"
import './Avatar.css'

function Avatar () {
    
    const login = useSelector(s => s.login)
    const urlAvatar = login.user.profile_picture 
    let url = `http://localhost:3001/static` + urlAvatar || 'default.png'

    return (

        <div className="avatar" style={{backgroundImage: `url(${url})`}} ></div>
            
    )

}

export default Avatar

