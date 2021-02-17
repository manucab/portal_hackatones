import {useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import './Register.css';
import {Helmet} from "react-helmet";


function Register() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [professional_profile, setprofessional_profile] = useState('desarrollador');
    const [rol, setRol] = useState('user');
    const [password, setPassword] = useState('');
    const [profile_picture, setProfilePicture] = useState('default');

    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault()

        const headers = {
            'Content-Type': 'application/json'
        }


        const ret = await fetch('http://localhost:3001/register', {
            headers,
            body: JSON.stringify(
                {
                    email,
                    name,
                    surname,
                    professional_profile,
                    rol,
                    password,
                    profile_picture
                }
            ),
            method: 'POST'
        })


        if (ret.status === 200) {

            alert('¡Felicidades, te has registrado!');
            return history.push('/');
        }
    }


    return (


        <div id="signup" className='signup'>

            <Helmet>
                <meta charSet="utf-8"/>
                <title>Accede a tu cuenta</title>
            </Helmet>

            <h1>Crear cuenta</h1>

            <form onSubmit={handleSubmit}
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
                    <select id="profiles" defaultvalue="desarrollador"
                        onChange={
                            e => setprofessional_profile(e.target.value)
                        }
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
                            <input type="radio" id="user" name="typeUser" value="user"
                                onChange={
                                    e => setRol(e.target.value)
                                }
                                defaultChecked/>
                            <label for="user">Usuario</label>
                        </div>

                        <div id="rOrganizer">
                            <input type="radio" id="organizer" name="typeUser" value="organizer"
                                onChange={
                                    e => setRol(e.target.value)
                                }/>
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
