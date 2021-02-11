import { Redirect, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import './ProfileInfo.css'
import useFetch from "../../Hooks/useFetch";
import capitalize from "../../Utils/capitalize"
import Avatar from "../Avatar/Avatar";

function showInfo (data) {

    return(

        <div className='personal-info'>
            <div>Nombre: {capitalize(data[0][0].user_name)}</div>
            <div>Apellido: {capitalize(data[0][0].surname)}</div>
            <div>Email: {data[0][0].email}</div>
            <div>Perfil Profesional: {capitalize(data[0][0].professional_profile)}</div>
            <div>Rol: {capitalize(data[0][0].rol)}</div>
        </div>

    )
}



function ProfileInfo () {
    
    const login = useSelector(s => s.login)
    const {id} = useParams()
    const data = useFetch(`http://localhost:3001/user/${id}`)
        
    if(!data) return 'Loading...' 
    if (!login) return <Redirect to="/" />


    return (
       
        <div className="profile" >
            <Avatar/>
            {showInfo(data)}
            <button className="edit-profile">⚙ Editar</button>
          
        </div>
        
    )

}

export default ProfileInfo