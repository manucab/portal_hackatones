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
<<<<<<< HEAD
import CreateHackathon from './Components/CreateHackathon/CreateHackathon';
=======
import EditProfile from './Components/EditProfile/EditProfile';
import StarRating from './Components/StarRating/StarRating';
>>>>>>> f9e2e7159f5f2faf5ea4ed1db80a89fd6907dde4

function App() {

    const handleSubmit = async e => {
        e.preventDefault()

console.log('entro en submit');


        const avatar = e.target.img.files[0] // avatar es el "name" del input


console.log(avatar);

        // Para enviar los datos, como la imagen es un file, usamos un FormData
        const fd = new FormData()
        fd.append('img', avatar)

        const headers = {
            'Content-Type': 'application/json'
        }



        const ret = await fetch('http://localhost:3000/upload', {
        
            body: fd,
            method: 'POST'
        })      .then(res => res.json())



        console.log(ret.status);

        if(ret.status === 200){

            alert('¡Felicidades, te has registrado!');
            // return history.push('/');
        }
    }


        return (<div className="App">
            <Header/>

            <Switch>

                <Route path='/upload' exact>
                <form onSubmit={handleSubmit} method="post">
                    <input type="file" name="img" accept="image/*"/>
                    <button type="submit">Enviar</button>
                </form>

            </Route>

            <Route path='/' exact>
                <Home/>
            </Route>
            <Route path='/login' exact>
                <Login/>
            </Route>
            <Route path="/register" exact>
                <PanelSingInUp/>
            </Route>
            <Route path='/user/:id'>
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

            <Route path='/createhackathon'>
                <h1>Organiza tú hackathon</h1>
                <CreateHackathon/>
            </Route>

            

        </Switch>

    { /* login && <Logout/> */
        } { /* <Logout/> */
        } < Footer /> </div>);
}

export default App;
