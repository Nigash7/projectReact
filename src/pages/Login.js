import React, { useState }from 'react'
import './login.css'
import { NavLink } from 'react-router-dom'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Form() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      // Fetch all users from MockAPI
      const response = await axios.get(
        "https://68d4ccdce29051d1c0ac1f74.mockapi.io/api/nig/user"
      );

      // Check if user exists
      const user = response.data.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );

      if (user) {
        setSuccess("Login successful!");
        console.log("Logged in user:", user);

        // Optional: redirect to dashboard or home
        navigate("/home"); // change path if you have a dashboard
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("API error:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div >
        <div className='bg-primary '>
    <div className="container ">
<form onSubmit={handleSubmit} className="col-lg-5 col-md-7 col-sm-12">
        <div className="form-group col-12  ">
            <div className="card p-4 mt-4 card-sm mx-auto col-12" >
                <div className="h4 mb-0">Login</div>
               


                

                <input name="email" value={formData.email} onChange={handleChange} className="mt-3 border-0  bg-light p-2" type="email"  id="" placeholder="Email" required />
                <input  name="password" value={formData.password} onChange={handleChange} className="mt-3 border-0  bg-light p-2" type="password" placeholder="Password" required />
                {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
                
               
                <div className="row">
                    <div className="col mt-3" id='login-button'>
                    <button type="submit" className="btn btn-primary col-5 ">Login</button></div>
                   
                </div>



            </div>
            
        </div>
        <p className="text-center text-white ">Already have an account? <NavLink className='butsi' to='/signup'>Signup</NavLink> </p>
   
    
    </form>
    
    </div>
    </div>
      
    </div>
  )
}

export default Form;
