import {Route} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import {USER_LOGIN} from "../../util/settings";
import {useDispatch} from "react-redux";
import {OPEN_MODAL} from "../../store/types/Type";

const CheckoutTemplate = (props) => {

    const dispatch = useDispatch();
    // const [state, setState] = useState({
    //     width: window.innerWidth,
    //     height: window.innerHeight
    // })
    const {Component, MobileComponent, ...restProps} = props;
    //
    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //     if (!localStorage.getItem(USER_LOGIN)) {
    //         dispatch({type: OPEN_MODAL})
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     window.onload = () => {
    //         setState({
    //             width: window.innerWidth,
    //             height: window.innerHeight
    //         })
    //     }
    //
    //     window.onresize = () => {
    //         setState({
    //             width: window.innerWidth,
    //             height: window.innerHeight
    //         })
    //     }
    // }, [])

    // const renderComponent = (propsRoute) => {
    //     if (state.width <= 414) {
    //         if (MobileComponent) {
    //             return <MobileComponent {...propsRoute} />
    //         }
    //         return <Component {...propsRoute} />
    //     }
    //     return <Component {...propsRoute} />
    // }
    //

    return <Route {...restProps} render={(propsRoute) => {

        return <Fragment>
            {/*{renderComponent(propsRoute)}*/}
            <Component/>
        </Fragment>
    }}/>
}

export default CheckoutTemplate;


