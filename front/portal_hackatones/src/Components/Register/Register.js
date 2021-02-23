import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './Register.css';
import {Helmet} from "react-helmet";
import useFetchPost from '../../Hooks/useFetchPost';
import Modal from '../Modal/Modal';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

function Register() { // Can be a string as well. Need to ensure each key-value pair ends with ;
    const override = css `
display: block;
margin: 0 auto;
border-color: red;
`;
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [professional_profile, setprofessional_profile] = useState('desarrollador');
    const [rol, setRol] = useState('user');
    const [password, setPassword] = useState('');
    const [registerOk, setRegisterOk] = useState(0);
    const profile_picture = 'default';
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const url ='http://localhost:3001/register';

    const history = useHistory();

    const params = {
        email,
        name,
        surname,
        professional_profile,
        rol,
        password,
        profile_picture
    };

    const ret = useFetchPost(params, registerOk, url);

console.log('ret :>> ', ret);

const clickBtnShowPassword = () =>{
    (showPassword) ? setShowPassword(false) : setShowPassword(true);    
}

const handlePassword = (e) =>{
  setPassword(e.target.value);
  isLenPassword(e);
}

const isLenPassword = (e) =>{

    (e.target.value.length < 8 ) ? setErrorPassword(true) : setErrorPassword(false);
    console.log('e.target.value.length :>> ', e.target.value.length);

}

    const handleSubmit = e => {
        e.preventDefault();
        setRegisterOk(1);
        setShowModal(true);

    }

    if (showModal) {

            return (<div> 
                
                {!ret &&  <ClipLoader color={'#b2b291'} loading={showModal} css={override} size={150} />}
                
                {
                (ret && ret.status === 200) &&
                < Modal title = "¡Bienvenido a Hackathons Plays!"
                show = {
                    showModal
                }
                onClose = {
                    () => history.push('/')
                }
                children = {
                    `Te has tegistrado satisfactoriamente, revisa la bandeja de entrada y activa tu cuenta en el enlace que te hemos enviado a ${email}`
                } >
            </Modal>} 
            

            {
                (ret && ret.status === 500) &&
                < Modal title = "Oppssss ha ocurrido un problema con su registro"
                show = {
                    showModal
                }
                onClose = {
                    () => history.push('/')
                }
                children = {
                    ret.Info
                } >
            </Modal>} 
            
            
            </div>
        )
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

                            pattern="[a-zA-Z ]{2,30}"

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
                            pattern="[a-zA-Z ]{2,30}"

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
                        <option value="marketing">Marketing</option>
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

                    <label  className={ errorPassword ? 'errorPass' : 'noErrorPass'} >La contraseña debe tener al menos 8 caracteres</label>

                    <input className="inputPass" type={showPassword ? 'text':"password"}
                        onChange={
                            handlePassword
                        }

                        minlength={8}
                    
                        required/>

                    <div className="btnShowPassword" onClick={clickBtnShowPassword}>👁️</div>
                </div>

                <button type="submit" className="button">Crea tu cuenta</button>

            </form>

        </div>
    )
}

export default Register;
