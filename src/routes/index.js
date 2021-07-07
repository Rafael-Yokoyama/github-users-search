import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Repositories from '../pages/Repositories';

function Routes() {
    return(
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/repositories" exact component={Repositories}/>
      </Switch>
    )
  }
  
  export default Routes