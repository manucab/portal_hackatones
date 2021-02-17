import { useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import './ResetPassword.css'

function ResetPassword () {

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {token} = useParams()

    const handleSubmit = async e => {

        e.preventDefault()

        const headers = {
            'Content-Type': 'application/json'
        }
        
      

        const ret = await fetch(`http://localhost:3001/forgot-password/reset-password/${token}`, {
            headers,
            body: JSON.stringify(
                {
                    newPassword,
                    confirmPassword
                }
            ),
            method: 'PUT'
        })


        if(ret.status === 200){

            alert('Se ha actualizado tu contraseña');
            return <Redirect to="/"/>
         
        }

    }

    return(


            <form className='forgot-password-form' onSubmit={handleSubmit}
                method="put">

                <div className="reset-password">
                    <div className="field new-password">
                        <label>
                            Introduce tu nueva contraseña:
                        </label>
                        <input type="password"
                            onChange={
                                e => setNewPassword(e.target.value)
                            }
                            required/>
                    </div>

                    <div className="field confirm-password">
                        <label>
                            Confirma tu contraseña:
                        </label>
                        <input type="password"
                            onChange={
                                e => setConfirmPassword(e.target.value)
                            }
                            required/>
                    </div>

                    <div className="password-warning">
                        {newPassword === confirmPassword ? null : <p>Las contraseñas deben coincidir</p>}
                    </div>

                </div>

                <button type="submit" className="button">Enviar email</button>

            </form>

    )

} 

export default ResetPassword