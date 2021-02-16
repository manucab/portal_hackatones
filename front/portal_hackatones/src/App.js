import {Route, Switch} from 'react-router-dom';
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
import EditProfile from './Components/EditProfile/EditProfile';
import StarRating from './Components/StarRating/StarRating';

function App() {
    return (
        <div className="App">
            <Header/>

            <Switch>
            <Route path='/' exact>
                  <Home/>
              </Route>
              <Route path='/login' exact>
                  <Login/>
              </Route>
              <Route path="/register" exact>
                  <PanelSingInUp/>
              </Route>
              <Route path='/user/:id' >
                <h1>Bienvenido a tu perfil</h1>
                <ProfileInfo/>
                <h1>Consulta tus estadísticas</h1>
                <UserStats/>
                <h1>Te has inscrito en estos hackatones</h1>
                <HackathonsJoined/>
                <HackathonsCreated/>
                <Logout/>
              </Route>

              <Route path='/user/:id'>
                  <h1>Bienvenido a tu perfil</h1>
                  <ProfileInfo/>
              </Route>
            </Switch>

            {/* login && <Logout/> */}
            {/* <Logout/> */}
            <Footer />
        </div>
    );
}

export default App;
