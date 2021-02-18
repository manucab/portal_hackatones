import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [process, setProcess] = useState('')
  const [showPassword, setShowPassword] = useState(false)


  const login = useSelector(s => s.login)
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    
    const res = await fetch('http://localhost:3001/login', {
      headers: { 
        'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password }),
      method: 'POST'
    })
    
    console.log(res)
    const data = await res.json()
    console.log(data)

    if (res.status === 200){
      dispatch({ type: 'login', data })}
    else {
      setProcess('Usuario o contraseña incorrectos')
      setEmail('')
      setPassword('')
    }
  }

  if (login) return <Redirect to="/" />

  return (

    
    <form className="page-login" onSubmit={handleSubmit}>
        <div>
            <input placeholder="email ..." type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
            <input placeholder="password ..." type={showPassword? 'text' : 'password'} minLength="8" required value={password} onChange={e => setPassword(e.target.value)} />
            <button className="show-password" type="button" onClick={() => setShowPassword(!showPassword)}>👁</button>
        </div>
        <div className="login-buttons">
          <button>Iniciar sesión</button>
        </div>
        
        <div className='errorMessage'>{process}</div>
        <p>
            <Link to="/forgot-password">No recuerdas tu contraseña?</Link>
        </p>
    </form>
  );
}

export default Login;
