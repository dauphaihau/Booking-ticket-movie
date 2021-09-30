import {Route} from "react-router-dom";
import {Fragment} from "react";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";
import Footer from "./Layout/Footer/Footer";


export const HomeTemplate = (props) => { // props: path, exact, Component

  const {Component, ...restProps} = props; // ...restProps : path, exact

  return <Route {...restProps} render={(propsRoute) => {

    return <Fragment>
      <Header {...propsRoute} />

      <HomeCarousel {...propsRoute}/>

      <Component {...propsRoute}/>

      <Footer {...propsRoute}/>
    </Fragment>
  }}/>
}