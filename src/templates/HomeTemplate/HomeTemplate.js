import {Route} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";

export const HomeTemplate = (props) => {

  const {Component, MobileComponent, ...restProps} = props;

  useEffect(() => {
    window.scrollTo(0,0)
  },)

  const [state, setState] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    window.onload = () => { // run when window load first time ( in case user change size before load screen )
      setState({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.onresize = () => { // run when window resize
      setState({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  }, [])

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
      <Header {...propsRoute} />
      {renderComponent(propsRoute)}
      <Footer {...propsRoute}/>
    </Fragment>
  }}/>
}