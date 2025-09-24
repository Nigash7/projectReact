import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import './signup.css'


function Home() {
  return (
    <div className='bg-primary'>
    
       
    <div className="container">
<form action="form.html" method="post">
        <div className="form-group ">
            <div className="card p-4 mt-4 card-sm mx-auto " >
                <div className="h4 mb-0"> Sign Up</div>
                <p className="display-6 text-secondary  mb-1">Please fill in this form to create an account!</p>


                <div className="row">
                    <div className="col-sm-6 mt-4 borger-0"><input  type="text" className="input border-0 bg-light w-100 p-2" placeholder="First Name" required />
                    </div>
                    <div className="col-sm-6 mt-4"><input className="input  border-0  bg-light w-100 p-2" type="text" placeholder="Last Name" required /></div>
                </div>

                <input className="mt-3 border-0  bg-light p-2" type="email" name="email" id="" placeholder="Email" required />
                <input className="mt-3 border-0  bg-light p-2" type="password" placeholder="Password" required />
                <input className="mt-3 border-0  bg-light p-2" type="Password" placeholder="Confirm Password" required />
                <div className="form-group form-checkbox ml-3 text-secondary">
                    <label className="mt-3" for="check"><input type="checkbox" className="form-check-input mt-2" required />I accept the <a href="# ">Terms
                            of Use</a> & <a href="#">Privacy Policy</a></label>

                </div>
                <div className="row">
                    <div className="col">
                    <button type="submit" className="btn btn-primary col-5 ">Sign Up</button></div>
                   
                </div>



            </div>
            
        </div>
        <p className="text-center text-white ">Already have an account?<Link className='butlog' to='/login'>Login</Link> </p>
   
    
    </form>
    
    </div>
    </div>
    
  )
}

export default Home
