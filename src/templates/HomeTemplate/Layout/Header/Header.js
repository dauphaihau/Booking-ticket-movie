import React from 'react';
import {NavLink} from "react-router-dom";

function Header(props) {
    return (
        <header className="p-4 bg-coolGray-100 text-coolGray-800  bg-black text-white fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <a href="#" aria-label="Back to homepage" className="flex items-center p-2">
                    <img height={125} width={125} src='./img/image-removebg-preview.png' alt="..."/>
                </a>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink exact to={'/home' } activeClassName='borderBottom'
                                 className=" flex i text-white items-center px-4 -mb-1 border-b-2 border-transparent text-violet-600 border-violet-600">Home</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink exact to={ '/contact' } activeClassName='borderBottom'
                                 className="flex text-white items-center px-4 -mb-1 border-b-2 border-transparent text-violet-600 border-violet-600">Contact</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink exact to='/news' activeClassName='borderBottom'
                                 className="flex text-white items-center px-4 -mb-1 border-b-2 border-transparent text-violet-600 border-violet-600">News</NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <button className="self-center px-8 py-3 rounded">Sign in</button>
                    <button className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-coolGray-50">Sign
                        up
                    </button>
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         className="w-6 h-6 text-coolGray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
        </header>
    );
}

export default Header;