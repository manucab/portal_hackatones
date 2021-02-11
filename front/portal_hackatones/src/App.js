import {Route, Switch} from 'react-router-dom';
import './App.css';
// import Footer from './Footer';
import Header from './Components/Header/Header.js';
import Login from './Components/Login/Login.js';
import Logout from './Components/Logout/Logout';
import PanelSingInUp from './Components/PanelSingInUp/PanelSingInUp';
import ProfileInfo from './Components/ProfileInfo/ProfileInfo.js';

function App() {
    return (
        <div className="App">
            <Header/>

            <Switch>
                <Route path='/login' exact>
                    <Login/>
                </Route>

                <Route path="/register" exact>
                    <PanelSingInUp/>
                </Route>

                <Route path='/user/:id'>
                    <h1>Bienvenido a tu perfil</h1>
                    <ProfileInfo/>
                </Route>
            </Switch>

            {/* login && <Logout/> */}
            {/* <Logout/> */}
        </div>
    );
}

export default App;
