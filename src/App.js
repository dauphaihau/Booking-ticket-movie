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
import Profile from "./pages/Profile/Profile";
import {AdminTemplate} from "./templates/AdminTemplate/AdminTemplate";
import Films from "./pages/Admin/Films/Films";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Users from "./pages/Admin/Users/Users";
import AddFilms from "./pages/Admin/Films/AddFilms/AddFilms";
import EditFilms from "./pages/Admin/Films/EditFilms/EditFilms";
import Showtime from "./pages/Admin/Showtimes/Showtime";

function App() {
    return (
        <Router history={history}>
            <Loading/>
            <Switch>
                <UserTemplate exact path='/login' Component={Login}/>
                <UserTemplate exact path='/register' Component={Register}/>
                <HomeTemplate exact path='/profile' Component={Profile}/>
                <HomeTemplate exact path='/home' Component={Home}/>
                <HomeTemplate exact path='/contact' Component={Contact}/>
                <HomeTemplate exact path='/news' Component={News}/>
                <HomeTemplate exact path='/detail/:id' Component={Detail}/>
                <CheckoutTemplate exact path='/checkout/:id' Component={Checkout}/>
                <AdminTemplate exact path='/admin' Component={Dashboard}/>
                <AdminTemplate exact path='/admin/films' Component={Films}/>
                <AdminTemplate exact path='/admin/films/addfilms' Component={AddFilms}/>
                <AdminTemplate exact path='/admin/films/edit/:id' Component={EditFilms}/>
                <AdminTemplate exact path='/admin/films/showtime/:id/:tenphim' Component={Showtime}/>
                <AdminTemplate exact path='/admin/users' Component={Users}/>


                <HomeTemplate path="/" Component={Home}/>
            </Switch>
        </Router>
    );
}

export default App;
