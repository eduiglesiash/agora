import React, { useState } from "react"
import axios from 'axios'
import { config } from "../config/config";
import { useNavigate } from "react-router-dom";

let AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const navigate = useNavigate();

  const signin = ({ identifier, password }) => {
    const data = { identifier, password };
  
    return axios.post(`${config.strapi.path}/auth/local`, data)
      .then(({data}) => {
        setUser(data.user);
        setJwt(data.jwt);
        return {
          status: 'success',
          user: data.user
        }
      })
      .catch(err => {
        console.error(`${config.toastMessage.loginError}`, err)
        return {
          status: 'error',
          message: err.response.data.message[0].messages[0].message
        }
      })
  }

  const signout = () => {
    setUser(null)
    setJwt(null)
    navigate(config.paths.login)
  };

  let value = { user, jwt, signin, signout };

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider }
