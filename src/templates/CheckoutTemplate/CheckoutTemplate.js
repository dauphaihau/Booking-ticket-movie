import {Redirect, Route} from "react-router-dom";
import {Fragment} from "react";
import {USER_LOGIN} from "../../util/settings";


const CheckoutTemplate = (props) => {

    const {Component, ...restProps} = props;

    // if (!localStorage.getItem(USER_LOGIN)) {
    //   return <Redirect to='/login'/>
    // }

    return <Route {...restProps} render={(propsRoute) => {

        return <Fragment>
            <Component {...propsRoute}/>
        </Fragment>
    }}/>
}

export default CheckoutTemplate