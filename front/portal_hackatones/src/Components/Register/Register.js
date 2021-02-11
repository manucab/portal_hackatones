import './Register.css';

function Register() {

    return (

                <div id="signup" className='signup'>
                    <h1>Crear cuenta</h1>

                    <form action="/" method="post">

                        <div className="completeName">
                            <div className="fieldName">
                                <label>
                                    Nombre:
                                </label>
                                <input type="text" required/>
                            </div>

                            <div className="fieldSurname">
                                <label>
                                   1º Apellido:
                                </label>
                                <input type="text" required />
                            </div>
                        </div>

                        <div className="fieldEmail">
                            <label>
                                Email:
                            </label>
                            <input type="email" required />
                        </div>

                        <div className="fieldPassword">
                            <label>
                                Contraseña
                            </label>
                            <input type="password" required/>
                        </div>

                        <button type="submit" className="button">Crea tu cuenta</button>

                    </form>

                </div>
    )
}

export default Register;
