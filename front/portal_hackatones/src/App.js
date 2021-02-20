import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import HackathonsCreated from './Components/HackathonsCreated/HackathonsCreated';
import HackathonsJoined from './Components/HackathonsJoined/HackathonsJoined';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header.js';
import Login from './Components/Login/Login.js';
import Logout from './Components/Logout/Logout';
import PanelSingInUp from './Components/PanelSingInUp/PanelSingInUp';
import ProfileInfo from './Components/ProfileInfo/ProfileInfo.js';
import UserStats from './Components/UserStats/UserStats';
import CreateHackathon from './Components/CreateHackathon/CreateHackathon';
import EditProfile from './Components/EditProfile/EditProfile';
import StarRating from './Components/StarRating/StarRating';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import {Helmet} from "react-helmet";
import ValidateAccount from './Components/ValidateAccount/ValidateAccount';
import EditHackathon from './Components/EditHackathon/EditHackathon';
import Posts from './Components/Posts/Posts';
import Post from './Components/Post/Post';
import Hackathon from './Components/Hackathon/Hackathon';
import OrganizerStats from './Components/OrganizerStats/OrganizerStats';

function App() {

    return (
        <div className="App">

            <Helmet>
                <meta charSet="utf-8"/>
                <title>Hackathon Plays</title>
                <link rel="canonical" href="http://localhost:3000/"/>
            </Helmet>

            <Header/>

            <Switch>

                <Route path='/' exact>
                    <Home/>
                </Route>

                <Route path='/login' exact>
                    <Redirect to="register/"/>
                </Route>

                <Route path='/forgot-password' exact>
                    <ForgotPassword/>
                </Route>
                <Route path='/forgot-password/reset-password/:token'>
                    <ResetPassword/>
                </Route>

                <Route path="/register" exact>
                    <PanelSingInUp/>
                </Route>

                <Route path='/user/validate/:id/:code' exact>
                    <ValidateAccount/>
                </Route>

                <Route path='/user/:id'>
                    <h1>Bienvenido a tu perfil</h1>
                    <ProfileInfo/>
                    <h1>Consulta tus estadísticas</h1>
                    <UserStats/>
                    <h1>Participaciones en hackathones</h1>
                    <HackathonsJoined/>
                    <h1>Hackathones Creados</h1>
                    <OrganizerStats/>
                    <HackathonsCreated/>
                    <Logout/>
                </Route>

                <Route path='/user/:id/:idHackathon/modify'>
                    <h1>Edita tu hackathon</h1>
                    <EditHackathon/>
                </Route>

                <Route path='/hackathon' exact>
                    <Hackathon/>
                </Route>

                <Route path='/createhackathon' exact>
                    <h1>Organiza tú hackathon</h1>
                    <CreateHackathon/>
                </Route>

                <Route path='/blog' exact>
                    <h1>Bienvenido a nuestro blog</h1>
                    <Posts/>
                </Route>

                <Route path='/blog/post/:id' exact>
                    <h1>Disfruta del articulo</h1>
                    <Post/>
                </Route>


            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
