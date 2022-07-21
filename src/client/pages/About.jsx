import React, { useState, useEffect } from "react";

import {
  NavLink
} from 'react-router-dom'

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import "./about.css";

export const getData = () => {
  return axios.get(
    "https://www.fastmock.site/mock/fe630c05191ce3c5fa2274f2830f2e74/api/getUserInfo"
  );
};

const About = () => {
  console.log('about')
  let dispatch = useDispatch();
  const name = useSelector((state) => {
    return state.name;
  });
  useEffect(() => {
    //判断服务端渲染有没有请求到数据，如果没有，则重新发起请求
    if (name === "" && typeof window !== "undefined") {
      getData().then((res) => {
        dispatch({
          type: "ACTION_TYPE",
          payload: res.data.data,
        });
      });
    }
  }, []);
  return <div className="about">
    <h2>About</h2>
    <NavLink to="/">跳转Home</NavLink>  
  </div>
}

export default About