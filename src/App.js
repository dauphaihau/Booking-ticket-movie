import './App.css';
import {history} from "./util/settings";
import {Route, Router, Switch} from "react-router-dom";
import {HomeTemplate} from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";

function App() {
    return (
        <Router history={history}>
            <Switch>
                <HomeTemplate exact path='/home' Component={Home}/>
                <HomeTemplate exact path='/contact' Component={Contact}/>
                <HomeTemplate exact path='/news' Component={News}/>
                <HomeTemplate exact path='/detail/:id' Component={Detail}/>
                <Route exact path='/login' Component={Login}/>
                <Route exact path='/register' Component={Register}/>

                <HomeTemplate exact path='/' Component={Home}/>
            </Switch>
        </Router>
    );
}

export default App;
