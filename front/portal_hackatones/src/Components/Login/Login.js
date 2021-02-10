import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// import Popup from 'reactjs-popup'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [process, setProcess] = useState('')

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

    
    <form className="page login" onSubmit={handleSubmit}>
        <div>
            <input placeholder="email ..." type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
            <input placeholder="password ..." type="password" minLength="8" required value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button>Iniciar sesión</button>
        <div className='errorMessage'>{process}</div>
        <p>
            <Link to="/recovery">No recuerdas tu contraseña?</Link>
        </p>
    </form>
  );
}

export default Login;
