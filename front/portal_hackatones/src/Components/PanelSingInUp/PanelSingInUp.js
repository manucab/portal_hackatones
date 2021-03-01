import { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./PanelSingInUp.css";

function PanelSingInUp() {
  const [active, setActive] = useState("signup");

  const handleClassTab = (tab) => {
    return active === tab ? "active" : "";
  };

  return (
    <div className="singInUp">
      <div className="tabContainer">
        <ul>
          <li className={"tabs " + handleClassTab("signup")}>
            <a  onClick={() => setActive("signup")}>
              Regístrate
            </a>
          </li>
          <li className={"tabs " + handleClassTab("login")}>
            <a  onClick={() => setActive("login")}>
              Inicia sesión
            </a>
          </li>
        </ul>

        <div id="signup" className={handleClassTab("signup")}>
          {active === "signup" && <Register />}{" "}
        </div>

        <div id="login" className={handleClassTab("login")}>
          {active === "login" && <Login />}{" "}
        </div>
      </div>
    </div>
  );
}

export default PanelSingInUp;
