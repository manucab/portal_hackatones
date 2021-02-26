import { Redirect, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import './ProfileInfo.css'
import useFetch from "../../Hooks/useFetch";
import capitalize from "../../Utils/capitalize"
import Avatar from "../Avatar/Avatar";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import EditProfile from "../EditProfile/EditProfile";
import { Helmet } from "react-helmet";

function showInfo (user_name, surname,email,professional_profile,rol) {

    return(

        <div className='personal-info'>
            <div><strong>Nombre: </strong>{user_name.split(' ').map(w => capitalize(w)).join(' ')}</div>
            <div><strong>Apellido: </strong>{surname.split(' ').map(w => capitalize(w)).join(' ')}</div>
            <div><strong>Email: </strong>{email}</div>
            <div><strong>Perfil Profesional:</strong> {capitalize(professional_profile)}</div>
            <div><strong>Rol: </strong>{capitalize(rol)}</div>
        </div>

    )
}

function ProfileInfo () {
    
    const login = useSelector(s => s.login)
    const {id} = useParams()
    const data = useFetch(`http://localhost:3001/user/${id}`)

    const [show,setShow] = useState(false)
        
    if(!data) return 'Loading...' 
    if (!login) return <Redirect to="/" />

    const user_name = data[0][0].user_name
    const surname = data[0][0].surname
    const email = data[0][0].email
    const professional_profile = data[0][0].professional_profile
    const rol = data[0][0].rol
    const profile_picture = data[0][0].profile_picture


    
    const handleClose = (e) => {
        
        setShow(false)
    }


    return (
       
        <div className="profile" >
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Bienvenido a tu perfil</title>
            </Helmet>
            <h1>Bienvenido a tu perfil</h1>

            <Avatar/>
            {showInfo(user_name,surname,email,professional_profile,rol)}
            <button className="edit-profile" onClick={()=>setShow(true) }>⚙ Editar</button>
            <Modal className="edit-profile-modal" title="Actualiza tu perfil" onClose={() => setShow(false)}  show={show}>
                <EditProfile handleClose={handleClose}
                   
                    user_name = {user_name}
                    surname = {surname}
                    email = {email}
                    professional_profile = {professional_profile}
                    rol = {rol}
                    profile_picture = {profile_picture}

                />
            </Modal>
          
        </div>
        
    )

}

export default ProfileInfo