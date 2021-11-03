import React, {Fragment} from 'react';
import _ from "lodash";
import {Menu, Transition} from "@headlessui/react";
import {ACCESS_TOKEN, history, USER_LOGIN} from "../../../util/settings";
import {classNames} from "../Checkout";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function HeaderCheckoutMobile(props) {
    const dispatch = useDispatch();
    const {userLogin} = useSelector(state => state.UserReducer)

    return (
        <div className='flex justify-start bg-white'>
            <div className='
                {/*text-center flex justify-center items-center*/}
                '>
                <NavLink
                    to='/home'
                    className='mr-20 transition-colors duration-300 text-black hover:text-blue-400'
                ><ArrowBackIosNewIcon className='h-8 w-8 mr-2'/></NavLink>
            </div>
        </div>

    );
}

export default HeaderCheckoutMobile;