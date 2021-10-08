import React, {Fragment} from 'react';
import {NavLink} from "react-router-dom";
import {ACCESS_TOKEN, history, USER_LOGIN} from "../../../../util/settings";
import {Switch} from 'antd';
import {useTranslation} from 'react-i18next';
import {useSelector} from "react-redux";
import _ from "lodash";

function Header(props) {

    const {userLogin} = useSelector(state => state.UserReducer)
    const {t, i18n} = useTranslation();

    const handleChange = (values) => {
        let keyLang = '';
        values === true ? keyLang = 'en' : keyLang = 'vi';
        i18n.changeLanguage(keyLang)
    }

    console.log('user-login', userLogin)

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button className="self-center pl-8 py-3 rounded"
                        onClick={() => {
                            history.push('/login')
                        }}
                >{t('Sign in')}
                </button>
                <button className="self-center px-8 py-3 rounded bg-violet-600 text-gray-50"
                        onClick={() => {
                            history.push('/register')
                        }}
                >
                    {t('Sign up')}
                </button>
            </Fragment>
        }
        return <Fragment>
            <button className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-gray-50"
                    onClick={() => {
                        history.push('/profile')
                    }}
            >
                {t('Hi')}, {userLogin.hoTen}
            </button>
            <button className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-gray-50"
                    onClick={() => {
                        localStorage.removeItem(USER_LOGIN);
                        localStorage.removeItem(ACCESS_TOKEN);
                        history.push('/home');
                        window.location.reload();
                    }}
            > Đăng xuất
            </button>
        </Fragment>
    }

    return (
        <header className=" bg-gray-100  opacity-70 bg-black text-white fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <div className="flex">
                    <NavLink to='/home' aria-label="Back to homepage" className="flex items-center p-2">
                        <svg className="w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg"
                             xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px"
                             viewBox="0 0 225 225" style={{enableBackground: "new 0 0 225 225"}} xmlSpace="preserve">
                            <style type="text/css"
                                   dangerouslySetInnerHTML={{__html: "\n.st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                "}}/>
                            <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                                <g>
                                    <path id="Layer0_0_1_STROKES" className="st0"
                                          d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"/>
                                </g>
                            </g>
                        </svg>
                    </NavLink>
                    <ul className="items-stretch hidden space-x-3 lg:flex pt-3">
                        <li className="flex ">
                            <NavLink exact to={'/home'} activeClassName='borderBottom'
                                     className=" flex i text-white items-center px-4 -mb-1 border-b-2 border-transparent text-violet-600 border-violet-600">
                                {t('Home')}
                            </NavLink>
                        </li>
                        <li className="flex">
                            <NavLink exact to={'/contact'} activeClassName='borderBottom'
                                     className="flex text-white items-center px-4 -mb-1 border-b-2 border-transparent text-violet-600 border-violet-600">
                                {t('Contact')}
                            </NavLink>
                        </li>
                        <li className="flex">
                            <NavLink exact to='/news' activeClassName='borderBottom'
                                     className="flex text-white items-center px-4 -mb-1 border-b-2 border-transparent text-violet-600 border-violet-600">
                                {t('News')}
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                    <button className="p-4 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             className="w-6 h-6 text-gray-800">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                    <Switch onChange={handleChange} checkedChildren="EN"
                            unCheckedChildren="EN" defaultChecked={false}
                            className='px-8'
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;