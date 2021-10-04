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
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import {UserTemplate} from "./templates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";

function App() {
    return (
        <Router history={history}>
            <Loading/>
            <Switch>
                <HomeTemplate exact path='/home' Component={Home}/>
                <HomeTemplate exact path='/contact' Component={Contact}/>
                <HomeTemplate exact path='/news' Component={News}/>
                <HomeTemplate exact path='/detail/:id' Component={Detail}/>
                <UserTemplate exact path='/login' Component={Login}/>
                <CheckoutTemplate exact path='/checkout/:id' Component={Checkout}/>
                <Route exact path='/register' Component={Register}/>
                <HomeTemplate path="/" Component={Home}/>
            </Switch>
        </Router>
    );
}

export default App;
