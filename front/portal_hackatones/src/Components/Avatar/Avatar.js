import { useSelector } from "react-redux"
import './Avatar.css'

function Avatar () {
    const login = useSelector(s => s.login)
    const urlAvatar = login.user.profile_picture   
    const avatarStyle = {backgroundImage: 'url(../../Media/Images/ProfilePictures'+urlAvatar+')'}

    return (

        <div className="avatar"
            style={avatarStyle} ></div>
            
    )

}

export default Avatar

