import React from "react";
import {Routes as Switch, Route} from 'react-router'
import About from "../pages/About";
import Home from "../pages/Home";
import {getData} from '../pages/About'

export const routes = [
  {
    path: "/",
    exact: true,
    component: <Home/>,
  },
  {
    path: "/about",
    exact: true,
    component: <About/>,
    loadData:getData
  },
];

export const Routes = () => {
  return <Switch>
      {routes.map((r, index) => {
        const { path, exact, component } = r;

        console.log(component)  
        return <Route key={index} exact={exact} path={path} element={component}></Route>;
      })}
      {/* <route component={404组件}></route> */}
  </Switch>

}
