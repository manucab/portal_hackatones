import {useState} from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import './PanelSingInUp.css';

function PanelSingInUp() {


    const [active, setActive] = useState('signup');

    const handleClassTab = (tab) => {
        return(active === tab) ? 'active' : '';
    }

    return (

        <div className="singInUp">

            <ul>
                <li className={"tabs " + handleClassTab('signup')}>
                    <a href="#signup"
                        onClick={
                            () => setActive('signup')
                    }>Regístrate</a>
                </li>
                <li className={"tabs " +  handleClassTab('login')}>
                    <a href="#login"
                        onClick={
                            () => setActive('login')
                    }>Inicia sesión</a>
                </li>
            </ul>

            <div className="tabContainer">


                <div id="signup"
                    className={
                        handleClassTab('signup')
                }>
                    {
                    (active === 'signup') && <Register/>
                } </div>


                <div id="login"
                    className={
                        handleClassTab('login')
                }>
                    {
                    (active === 'login') && <Login/>
                } </div>

            </div>
        </div>


    );
}

export default PanelSingInUp;
