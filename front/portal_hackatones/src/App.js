import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header.js";
import PanelSingInUp from "./Components/PanelSingInUp/PanelSingInUp";
import CreateHackathon from "./Components/CreateHackathon/CreateHackathon2";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import { Helmet } from "react-helmet";
import ValidateAccount from "./Components/ValidateAccount/ValidateAccount";
import EditHackathon from "./Components/EditHackathon/EditHackathon";
import Posts from "./Components/Posts/Posts";
import Post from "./Components/Post/Post";
import Hackathon from "./Components/Hackathon/Hackathon";
import HackathonSearch from "./Components/HackathonSearch/HackathonSearch";
import About from "./Components/About/About";
import ProfilePage from "./Components/ProfilePage/ProfilePage";


function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hackathon Place</title>
        <link rel="canonical" href="http://localhost:3000/" />
      </Helmet>

      <Header />

      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/login" exact>
          <Redirect to="register/" />
        </Route>

        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/forgot-password/reset-password/:token">
          <ResetPassword />
        </Route>

        <Route path="/register" exact>
          <PanelSingInUp />
        </Route>

        <Route path="/user/validate/:id/:code" exact>
          <ValidateAccount />
        </Route>

        <Route path="/user/:id" exact>
          <ProfilePage/>
        </Route>

        <Route path="/user/:id/:idHackathon/modify" exact>
          <h1>Edita tu hackathon</h1>
          <EditHackathon />
        </Route>

        <Route path="/hackathon/search" exact>
          <HackathonSearch />
        </Route>

        <Route path="/hackathon/:id" exact>
          <Hackathon />
        </Route>

        <Route path="/createhackathon" exact>
          <h1>Organiza tú hackathon</h1>
          <CreateHackathon />
        </Route>

        <Route path="/blog" exact>
          <Posts />
        </Route>

        <Route path="/about" exact>
          <About />
        </Route>

        <Route path="/blog/post/:id" exact>
          <Post />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
