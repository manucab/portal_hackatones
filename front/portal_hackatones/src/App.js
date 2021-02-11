import { Route, Switch } from 'react-router-dom';
import './App.css';
import HackathonsJoined from './Components/HackathonsJoined/HackathonsJoined';
// import Footer from './Footer';
import Header from './Components/Header/Header.js';
import Login from './Components/Login/Login.js';
import Logout from './Components/Logout/Logout';
import ProfileInfo from './Components/ProfileInfo/ProfileInfo.js';

function App() {
  return (
    <div className="App">
      <Header/>

      <Switch>
          <Route path='/login' exact>
            <Login/>
          </Route>

          <Route path='/user/:id' >
            <h1>Bienvenido a tu perfil</h1>
            <ProfileInfo/>
            <h1>Te has inscrito en estos hackatones</h1>
            <HackathonsJoined/>
          </Route>
      </Switch>

      <Logout/>
    </div>
  );
}

export default App;
