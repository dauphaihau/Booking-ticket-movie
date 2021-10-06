import {Route} from "react-router-dom";
import {Fragment, useEffect} from "react";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";
import Footer from "./Layout/Footer/Footer";


export const HomeTemplate = (props) => { // props: path, exact, Component

  const {Component, ...restProps} = props; // ...restProps : path, exact
  
  useEffect(() => {
    window.scrollTo(0,0)
  },)

  return <Route {...restProps} render={(propsRoute) => {

    return <Fragment>
      <Header {...propsRoute} />

      <Component {...propsRoute}/>

      <Footer {...propsRoute}/>
    </Fragment>
  }}/>
}