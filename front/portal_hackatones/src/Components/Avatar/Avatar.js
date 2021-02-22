import { useSelector } from "react-redux"
import './Avatar.css'

function Avatar () {
    const login = useSelector(s => s.login)
    const urlAvatar = login.user.profile_picture 
    console.log('Avatar>>',urlAvatar)  
    const avatarStyle = {backgroundImage: 'url(http://localhost:3001/)'}
    let url = `http://localhost:3001/static` + urlAvatar || 'default.png'
    console.log('urlmontada',url)
    return (

        <div className="avatar" style={{backgroundImage: `url(${url})`}} ></div>
            
    )

}

export default Avatar

