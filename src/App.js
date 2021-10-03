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
import {lazy, Suspense} from 'react'
import {UserTemplate} from "./templates/UserTemplate/UserTemplate";

const CheckoutTemplateLazy = lazy(() => import ('./templates/CheckoutTemplate/CheckoutTemplate'))

function App() {
    return (
        <Router history={history}>
            <Switch>
                <HomeTemplate exact path='/home' Component={Home}/>
                <HomeTemplate exact path='/contact' Component={Contact}/>
                <HomeTemplate exact path='/news' Component={News}/>
                <HomeTemplate exact path='/detail/:id' Component={Detail}/>
                <UserTemplate exact path='/login' Component={Login}/>
                <Suspense fallback={<h1>Loading....</h1>}>
                    <CheckoutTemplateLazy exact path='/checkout/:id' Component={Checkout}/>
                </Suspense>
                <Route exact path='/register' Component={Register}/>

                <Route exact path='/' Component={Home}/>
            </Switch>
        </Router>
    );
}

export default App;
