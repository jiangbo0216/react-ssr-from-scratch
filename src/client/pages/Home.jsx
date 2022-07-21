import React from 'react'
import './home.css';
import {
  NavLink
} from 'react-router-dom'

const Home = () => {
  console.log('====')
  return <div className="home">
    <h2>Home</h2>
    <NavLink to="/about">跳转About</NavLink>  
  </div>
}

export default Home