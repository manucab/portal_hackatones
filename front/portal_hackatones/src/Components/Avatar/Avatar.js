import { useSelector } from "react-redux"
import './Avatar.css'

function Avatar () {
    const login = useSelector(s => s.login)
    const urlAvatar = login.user.profile_picture   
    const avatarStyle = {backgroundImage: 'url(http://localhost:3001/)'}

    return (

        <div className="avatar" style={{backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoHYtXTchhspak0O8PNPKAPD9Cf08U6284ng&usqp=CAU)'}} ></div>
            
    )

}

export default Avatar

