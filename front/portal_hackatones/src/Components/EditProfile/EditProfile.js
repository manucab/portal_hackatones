import {useState} from 'react';
import { useSelector } from 'react-redux';
import { Redirect} from 'react-router-dom';
import './EditProfile.css';

function EditProfile(props) {
    const login = useSelector(s => s.login)
    const id = login.user.id 

    const [email, setEmail] = useState(props.email);
    const [user_name, setName] = useState(props.user_name);
    const [surname, setSurname] = useState(props.surname);
    const [professional_profile, setProfessionalProfile] = useState(props.professional_profile);
    const [rol, setRol] = useState(props.rol);
    const [password, setPassword] = useState('');
    const [profile_picture, setProfilePicture] = useState('default');

    const handleClose = props.handleClose



    const handleSubmit = async e => {
        e.preventDefault()
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization':login.token
        }
    
    
        const ret = await fetch(`http://localhost:3001/user/${id}/update`, {
            headers,
            body: JSON.stringify(
                {
                    email,
                    user_name,
                    surname,
                    professional_profile,
                    rol,
                    profile_picture
                }
            ),
            method: 'PUT'
        })
        
        if(ret.status === 200){
    
            alert('¡Se ha actualizado tu perfil!');
            handleClose()
            window.location.reload();
        }
    }
    

   

    return (

        <div id="signup" className='signup'>

            <form onSubmit={handleSubmit}
                method="put">

                <div className="completeName">
                    <div className="field fieldName">
                        <label>
                            Nombre:
                        </label>
                        <input type="text"
                            value={user_name}
                            onChange={
                                e => setName(e.target.value)
                            }
                            required/>
                    </div>

                    <div className="field fieldSurname">
                        <label>
                            Apellidos:
                        </label>
                        <input type="text"
                            value={surname}
                            onChange={
                                e => setSurname(e.target.value)
                            }
                            required/>
                    </div>
                </div>

                <div className="field fieldEmail">
                    <label>
                        Email:
                    </label>
                    <input type="email"
                        value = {email}
                        onChange={
                            e => setEmail(e.target.value)
                        }
                        required/>
                </div>


                <div className="field fielProfessionalProfile">
                    <label>
                        Perfil profesional:
                    </label>
                    {/* <input type="text" list="profiles"
                        onChange={
                            e => setProfessionalProfile(e.target.value)
                        }
                        required/> */}
                    <select id="profiles" defaultvalue="desarrollador"
                        value={professional_profile}
                        onChange={e => setProfessionalProfile(e.target.value)}
                        required>
                        <option value="desarrollador">Desarrollador</option>
                        <option value="marqueting">Marqueting</option>
                        <option value="diseñador">Diseñador</option>
                        <option value="otro">Otro</option>
                    </select>


                </div>


                <div className="field fielProfile">
                    <label>Tipo usuario:</label>
                    <div className="rOption">

                        <div id="rUser">
                            <input type="radio" id="user" name="typeUser" value="user" onChange={e => setRol(e.target.value)}
                                defaultChecked/>
                            <label for="user">Usuario</label>
                        </div>

                        <div id="rOrganizer">
                            <input type="radio" id="organizer" name="typeUser" value="organizer"
                                 onChange={
                                     e => setRol(e.target.value)
                                 }
                                 />
                            <label for="organizer">Organizador</label>
                        </div>
                    </div>

        

                </div>

                <button type="submit" className="button" >Actualizar Perfil</button>

            </form>

        </div>
    )
}

export default EditProfile;
