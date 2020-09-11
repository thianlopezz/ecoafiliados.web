import React, { createContext, useState, useEffect } from 'react';
import { proxyConfig } from '../helpers/proxyConfig';
const context = createContext(null);

const UserProvider = props => {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch(`${proxyConfig.url}/api/user`)
      .then(res => res.json())
      .then(res => setUser(res))
      .catch(err => {
        console.log(err);
      });
  }, []);
  return <context.Provider value={user}>{props.children}</context.Provider>;
};
UserProvider.context = context;
export default UserProvider;
