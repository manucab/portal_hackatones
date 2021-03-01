import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import eyeOpen from "../../Media/Images/General/eye-solid.png";
import eyeClose from "../../Media/Images/General/eye-closed.png";
import { Helmet } from "react-helmet";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [process, setProcess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = useSelector((s) => s.login);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/login", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      method: "POST",
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({ type: "login", data });
    } else {
      setProcess("Usuario o contraseña incorrectos");
      setEmail("");
      setPassword("");
    }
  };

  if (login) return <Redirect to={`/user/${login.user.id}`} />;

  return (
    <div className="login-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Inicia Sesión</title>
      </Helmet>

      <h1>Nos alegramos de volver a verte</h1>

      <form className="form-login" onSubmit={handleSubmit}>
        <div className="login-input">
          <label>Email: </label>
          <input
            placeholder="email ..."
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-input">
          <label>Contraseña: </label>
          <div className="password-input">
            <input
              placeholder="password ..."
              type={showPassword ? "text" : "password"}
              minLength="8"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              className="show-password"
              src={showPassword ? eyeClose : eyeOpen}
              alt="show password"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <div className="login-buttons">
          <button>Iniciar sesión</button>
        </div>

        <div className="errorMessage">{process}</div>
        <p>
          <Link to="/forgot-password">No recuerdas tu contraseña?</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
