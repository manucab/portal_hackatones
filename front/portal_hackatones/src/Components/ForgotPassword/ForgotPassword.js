import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Redirect, useHistory } from 'react-router-dom'
import './ForgotPassword.css'

function ForgotPassword () {

    const [email, setEmail] = useState('')
    const history = useHistory()

    const handleSubmit = async e => {

        e.preventDefault()

        const headers = {
            'Content-Type': 'application/json'
        }

        const ret = await fetch('http://localhost:3001/forgot-password', {
            headers,
            body: JSON.stringify(
                {
                    email,
                }
            ),
            method: 'PUT'
        })


        if(ret.status === 200){

            alert('Te hemos enviado un email a tu correo. Revisa tu bandeja de entrada');
            return history.push('/')
         
        } else{
            alert('No encontramos ese email en nuestro registro. Prueba a registrarte o revisa tu correo para activar tu cuenta')
        } 

    }

    return(


            <form className='forgot-password-form' onSubmit={handleSubmit}
                method="put">
                
                <Helmet>
                <meta charSet="utf-8"/>
                <title>Recupera tu contraseña</title>
                </Helmet>

                <div className="email">
                    <div className="field email">
                        <label>
                            Introduce tu email:
                        </label>
                        <input type="email"
                            onChange={
                                e => setEmail(e.target.value)
                            }
                            required/>
                    </div>

                </div>

                <button type="submit" className="button">Enviar email</button>

            </form>

    )

} 

export default ForgotPassword