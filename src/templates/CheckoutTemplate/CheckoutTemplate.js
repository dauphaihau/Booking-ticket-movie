import {Redirect, Route} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import {USER_LOGIN} from "../../util/settings";

const CheckoutTemplate = (props) => {

    const [state, setState] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    const {Component, MobileComponent, ...restProps} = props;

    useEffect(() => {
        window.scrollTo(0, 0)
    },)

    useEffect(() => {
        window.onload = () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.onresize = () => {
            setState({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
    }, [])

    if (!localStorage.getItem(USER_LOGIN))   {
        return <Redirect to='/login'/>
    }

    const renderComponent = (propsRoute) => {
        if (state.width <= 414) {
            if (MobileComponent) {
                return <MobileComponent {...propsRoute} />
            }
            return <Component {...propsRoute} />
        }
        return <Component {...propsRoute} />
    }


    return <Route {...restProps} render={(propsRoute) => {

        return <Fragment>
            {renderComponent(propsRoute)}
        </Fragment>
    }}/>
}

export default CheckoutTemplate;


