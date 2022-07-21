import React from 'react'

import {Routes} from '../router'

import Html from '../pages/Html'

import {
  BrowserRouter as Router
} from 'react-router-dom'

import {Provider} from 'react-redux';
import {createClientStore} from '../store'

const App = ()=>{
  return (
  // <Html title="React SSR Demo" REDUX_STATE={'{}'}>
  <Provider store={createClientStore()}>
    <Router basename="/">{Routes()}</Router>
  </Provider>
// </Html>
  )

}

export default App;