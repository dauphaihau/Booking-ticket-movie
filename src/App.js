import './App.css';
import {history} from "./util/settings";
import {Router, Switch} from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import Profile from "./pages/Profile/Profile";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Films from "./pages/Admin/Films/Films";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Users from "./pages/Admin/Users/Users";
import AddFilms from "./pages/Admin/Films/AddFilms/AddFilms";
import EditFilms from "./pages/Admin/Films/EditFilms/EditFilms";
import Showtime from "./pages/Admin/Showtimes/Showtime";
import EditUser from "./pages/Admin/Users/EditUser/EditUser";
import AddUser from "./pages/Admin/Users/AddUser/AddUser";
import SettingTemplate from "./templates/SettingTemplate/SettingsTemplate";
import HistoryBooking from "./pages/Profile/HistoryBooking";
import Detail_mobile from "./pages/Detail/Detail_mobile";
import Checkout_mobile from "./pages/Checkout/Checkout_mobile";
import LoginModal from "./components/Modal/LoginModal";
import React  from "react";
import {Toaster} from "react-hot-toast";
import LoadingGif from "./components/Loading/Loading";

function App() {
    return (
        <Router history={history}>
            <LoginModal/>
            <Toaster position={"top-center"} reverseOrder={true}/>
            <LoadingGif/>

            <Switch>
                <UserTemplate exact path='/login' Component={Login}/>
                <UserTemplate exact path='/register' Component={Register}/>

                <SettingTemplate exact path='/setting/profile/:tentaikhoan' Component={Profile}/>
                <SettingTemplate exact path='/setting/history/:tentaikhoan' Component={HistoryBooking}/>

                <HomeTemplate exact path='/home' Component={Home}/>
                <HomeTemplate exact path='/contact' Component={Contact}/>
                <HomeTemplate exact path='/news' Component={News}/>
                <HomeTemplate exact path='/detail/:id' Component={Detail} MobileComponent={Detail_mobile}/>

                <CheckoutTemplate exact path='/checkout/:id' Component={Checkout} MobileComponent={Checkout_mobile}/>

                <AdminTemplate exact path='/admin' Component={Dashboard}/>
                <AdminTemplate exact path='/admin/films' Component={Films}/>
                <AdminTemplate exact path='/admin/films/addfilms' Component={AddFilms}/>
                <AdminTemplate exact path='/admin/films/edit/:id' Component={EditFilms}/>
                <AdminTemplate exact path='/admin/films/showtime/:tenphim' Component={Showtime}/>
                <AdminTemplate exact path='/admin/users' Component={Users}/>
                <AdminTemplate exact path='/admin/users/adduser' Component={AddUser}/>
                <AdminTemplate exact path='/admin/users/edit/:tentaikhoan' Component={EditUser}/>

                <HomeTemplate path="/" Component={Home}/>
            </Switch>
        </Router>
    );
}

export default App;
