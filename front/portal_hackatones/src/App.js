import { Route, Switch } from 'react-router-dom';
import './App.css';
// import Footer from './Footer';
import Header from './Header';
import Login from './Login';
import ProfileInfo from './ProfileInfo';

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
          </Route>


      </Switch>
    </div>
  );
}

export default App;
