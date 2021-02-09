import { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../Media/Images/logo.jpg'
import './ProfileInfo.css'
import useFetch from "../../Hooks/useFetch";


function showInfo (data) {

    return(
        <div className="perfil">

            <div className='personal-info'>

                <h1>Información de Perfil</h1>
                <h2>{data[0][0].user_name}</h2>
                <h3>{data[0][0].surname}</h3>
                <h3>{data[0][0].email}</h3>
                <h3>{data[0][0].professional_profile}</h3>
                <h3>{data[0][0].rol}</h3>

            </div>
            <div className="participaciones">
                <h1>Te has inscrito en estos hackathones</h1> 
                {data[1].map( h => 
                    <div className="hackathones-participados">
                        <h2>Nombre: {h.hackathon_name}</h2>
                        <h3>Formato: {h.hackathon_place}</h3>
                        <h3>Ciudad: {h.city}</h3>
                        <h3>Fecha Inicio: {h.start_date.split('T')[0]}</h3>
                        <h3>Fecha Final: {h.end_date.split('T')[0]}</h3>
                        <h3>Estado Hackathon: {h.hackathon_status}</h3>
                        <h3>Tecnologías: {h.techs}</h3>

                    </div>

                )}

            </div>
            <div className="creados">
                <h1>Has creado estos hackathones</h1> 
                {data[2].map( h => 
                    <div className="hackathones-creados">
                        <h2>Nombre: {h.hackathon_name}</h2>
                        <h3>Formato: {h.hackathon_place}</h3>
                        <h3>Ciudad: {h.city}</h3>
                        <h3>Fecha Inicio: {h.start_date.split('T')[0]}</h3>
                        <h3>Fecha Final: {h.end_date.split('T')[0]}</h3>
                        <h3>Estado Hackathon: {h.hackathon_status}</h3>
                        <h3>Tecnologías: {h.techs}</h3>
                    </div>

                )}

            </div>
            <div className="estadisticas">
                <h1>Estas son tus estadísticas</h1> 
                    <div>
                        <h2>Participaciones: {data[3][0].participaciones}</h2>
                        <h3>Puesto Medio: {data[3][0].puesto_medio}</h3>
                        <h3>Mejor Puesto: {data[3][0].mejor_puesto}</h3>
                    </div>

            </div>





        </div>

      
        
    )

}



function ProfileInfo () {
    
    const [on,setOn] = useState(false)
    const login = useSelector(s => s.login)
    const dispatch = useDispatch()
    const {id} = useParams()
    const hackathons = useFetch(`http://localhost:3001/user/${id}`)
    console.log(hackathons)

    const handleLogout = () => {
        dispatch({ type: 'logout' })
    }

    if (!login) return <Redirect to="/" />


    return (

        <div className="acordeon">
            <img src={logo} alt="Logo del Carrusel" onClick={() => setOn(!on)} />
            <button onClick={handleLogout}>Logout</button>
            {on? showInfo(hackathons) : <h1>Carga tu perfil</h1>}
            

        </div>
            
    )

}

export default ProfileInfo