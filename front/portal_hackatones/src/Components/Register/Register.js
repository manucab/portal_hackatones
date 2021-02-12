import {useState} from 'react';
import './Register.css';

function Register() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [professionalProfile, setProfessionalProfile] = useState('');
    const [rol, setRol] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const handleSubmit = async e => {
        e.preventDefault()

        const headers = {
            'Content-Type': 'application/json'
        }

        await fetch('http://localhost:3000/register', {
            headers,
            body: JSON.stringify(
                {
                    email,
                    name,
                    surname,
                    professionalProfile,
                    rol,
                    password,
                    profilePicture
                }
            ),
            method: 'POST'
        })
        // reload()
    }


    return (

        <div id="signup" className='signup'>
            <h1>Crear cuenta</h1>

            <form action={handleSubmit}
                method="post">

                <div className="completeName">
                    <div className="field fieldName">
                        <label>
                            Nombre:
                        </label>
                        <input type="text"
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
                        onChange={
                            e => setEmail(e.target.value)
                        }
                        required/>
                </div>


                <div className="field fielProfessionalProfile">
                    <label>
                        Perfil profesional:
                    </label>
                    <input type="text" list="profiles"
                        onChange={
                            e => setProfessionalProfile(e.target.value)
                        }
                        required/>
                    <datalist id="profiles">
                        <option value="Desarrollador"/>
                        <option value="Marqueting"/>
                        <option value="Diseñador"/>
                        <option value="Otro"/>
                    </datalist>
                </div>


                <div className="field fieldPassword">
                    <label>Tipo usuario:</label>
                    <div className="rOption">

                        <div id="rUser">
                            <input type="radio" id="user" name="typeUser" value="user"
                                onChange={
                                    e => setRol(e.target.value)
                                }
                                checked/>
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

                <div className="field fieldPassword">
                    <label>
                        Contraseña:
                    </label>
                    <input type="password"
                        onChange={
                            e => setPassword(e.target.value)
                        }
                        required/>
                </div>

                <button type="submit" className="button">Crea tu cuenta</button>

            </form>

        </div>
    )
}

export default Register;
