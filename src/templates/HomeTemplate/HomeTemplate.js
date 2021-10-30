import {Route} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";

export const HomeTemplate = (props) => {

  const {Component, MobileComponent, ...restProps} = props;

  useEffect(() => {
    window.scrollTo(0,0)
  },)

  const [state] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

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
      <Header {...propsRoute}  />
      {renderComponent(propsRoute)}
      <Footer {...propsRoute}/>
    </Fragment>
  }}/>
}