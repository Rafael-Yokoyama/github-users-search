

import React, { useState } from 'react';
import api from '../../services/api'
const Input = () => {

    const [users, setUsers] = useState([])

   
 
 /*   function getAPI() {
       axios.get('https://api.github.com/users/ramosht/repos').then(response => console.log(response.data))
   }
    
   */

   const getAPI = () => {
    if (users !== undefined) {
      api.get(`/${users}/repos`)
        .then(response => console.log(response.data))
    }  
  }
 

  return (
    <>
     <input name="user"  id="user" className="userInput" placeholder="User" onChange={(e) => setUsers(e.target.value)}/>
     <button onClick={getAPI}>Search</button>
    </>
  );
};
export default Input ; 