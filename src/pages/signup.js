import React ,{useState} from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import './signup.css';
import axios from 'axios';




function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous messages
        setError('');
        setSuccess('');

        // Validation
        const { firstName, lastName, email, password, confirmPassword } = formData;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // API call
        try {
            const existing = await axios.get(
      "https://68d4ccdce29051d1c0ac1f74.mockapi.io/api/nig/user"
    );

    const userExists = existing.data.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      setError("Email already registered");
      return;
    }
            const response = await axios.post('https://68d4ccdce29051d1c0ac1f74.mockapi.io/api/nig/user', {
                firstName,
                lastName,
                email,
                password,
            });

            setSuccess("Signup successful!");
            console.log("response:", response.data);
        } catch (err) {
    console.log(err.response?.data); // Add this line to inspect error shape
    const errorMessage = err.response?.data?.message || "Signup failed";
    setError(errorMessage);
                            }

                        

    };


  return (
    <div className='bg-primary'>
    
       
    <div className="container">
<form onSubmit={handleSubmit}>
        <div className="form-group ">
            <div className="card p-4 mt-4 card-sm mx-auto " >
                <div className="h4 mb-0"> Sign Up</div>
                <p className="display-6 text-secondary  mb-1">Please fill in this form to create an account!</p>


                <div className="row">
                    <div className="col-sm-6 mt-4 borger-0"><input name='firstName' value={formData.firstName} onChange={handleChange} type="text" className="input border-0 bg-light w-100 p-2" placeholder="First Name" required />
                    </div>
                    <div className="col-sm-6 mt-4"><input name='lastName' value={formData.lastName} onChange={handleChange} className="input  border-0  bg-light w-100 p-2" type="text" placeholder="Last Name" required /></div>
                </div>

                <input name='email' value={formData.email} onChange={handleChange} className="mt-3 border-0  bg-light p-2" type="email"  id="" placeholder="Email" required />
                <input name='password' value={formData.password} onChange={handleChange} className="mt-3 border-0  bg-light p-2" type="password" placeholder="Password" required />
                <input name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} className="mt-3 border-0  bg-light p-2" type="Password" placeholder="Confirm Password" required />
                <div className="form-group form-checkbox ml-3 text-secondary">
                    {error && <p style={{color:"red"}}>{error}</p>}
                    {success && <p style={{color:"green"}}>{success}</p>}
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

export default Signup
