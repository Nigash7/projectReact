import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'


function Form() {
  return (
    <div >
        <div className='bg-primary '>
    <div className="container ">
<form action="form.html" method="post"className="col-lg-5 col-md-7 col-sm-12">
        <div className="form-group col-12  ">
            <div className="card p-4 mt-4 card-sm mx-auto col-12" >
                <div className="h4 mb-0">Login</div>
               


                

                <input className="mt-3 border-0  bg-light p-2" type="email" name="email" id="" placeholder="Email" required />
                <input className="mt-3 border-0  bg-light p-2" type="password" placeholder="Password" required />
                
               
                <div className="row">
                    <div className="col mt-3" id='login-button'>
                    <button type="submit" className="btn btn-primary col-5 ">Login</button></div>
                   
                </div>



            </div>
            
        </div>
        <p className="text-center text-white ">Already have an account? <Link className='butsi' to='/signup'>Signup</Link> </p>
   
    
    </form>
    
    </div>
    </div>
      
    </div>
  )
}

export default Form
