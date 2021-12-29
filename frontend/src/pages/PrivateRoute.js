import React from 'react';
import { Redirect, Route } from 'wouter';
import { config } from '../config/config';


const PrivateRoute = ({ children, ...rest }) => {
  console.log({children})
  let authenticated = false;
  return (
    <Route {...rest} render={()=>authenticated ? children : <Redirect to={config.paths.login}/>}/>
  )
};
        
export default PrivateRoute;
