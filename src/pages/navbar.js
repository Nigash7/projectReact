import React from 'react'
import {NavLink} from 'react-router-dom'
import './navbar.css'

function navbar() {
  return (
    <div className='navio'>
        <nav>
           <NavLink className="NavLink" to='/home'>Home</NavLink> 
            <NavLink className="NavLink" to='/login'>Login</NavLink> 
             <NavLink className="NavLink" to='/signup'>Signup</NavLink>
              <NavLink className="NavLink" to='/logout'>Logout</NavLink>


              

            
        </nav>

      
    </div>
  )
}

export default navbar
