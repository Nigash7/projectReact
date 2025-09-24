import React from 'react'
import {NavLink} from 'react-router-dom'

function navbar() {
  return (
    <div>
        <ul>
           <NavLink to='/home'><li>Home</li></NavLink> 
            <NavLink to='/login'><li>Login</li></NavLink> 
             <NavLink to='/signup'><li>Signup</li></NavLink> 
            
        </ul>

      
    </div>
  )
}

export default navbar
