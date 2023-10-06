
// Import Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css';

// import library
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Import Service
import { register } from '../../../services/UserService';

const colorTextLink = {
    textDecoration: "none",
    color: '#0094FF'
};

function Register() {
    // useState
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')

    // useNavigate
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        // checking cPassword === Password ??
        if (cPassword === password) {
            // Valid
            var data = {
                username,
                password,
                email,
                firstname,
                lastname
            }
            // console.log(data);

            try {
                const response = await register(data);
                // console.log(response);
                // Success
                console.log("Register successful : " + response.message);
                // Success Register
                navigate('/')
            } catch (error) {
                console.log(error.response.data.message);
                console.log("Register not successful");
            }

        } else {
            // Invalid (cPassword !== password)
            console.log("cPassword !== password");
            console.log("Register not successful");
        }
    }

    return (
        <div>
            {/* Content */}
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                {/* Box White */}
                <div className="container bg-white w-50 py-3 rounded">
                    <div className="row h-100">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            {/* INSIDE Box White */}
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 mt-1 mb-4 d-flex justify-content-center align-items-center">
                                        {/* Label */}
                                        <h3 className="my-0">Register</h3>
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Username */}
                                        <input type="text" className="form-control w-75 py-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Password */}
                                        <input type="password" className="form-control w-75 py-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* C_Password */}
                                        <input type="password" className="form-control w-75 py-2" placeholder="Confirm password" onChange={(e) => setCPassword(e.target.value)} />
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Email */}
                                        <input type="email" className="form-control w-75 py-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Email */}
                                        <div className='row w-75'>
                                            <div className="col-6 ps-0 d-flex justify-content-center align-items-center">
                                                {/* Firstname */}
                                                <input type="text" className="form-control py-2" placeholder="Firstname" onChange={(e) => setFirstname(e.target.value)} />
                                            </div>
                                            <div className="col-6 pe-0 d-flex justify-content-center align-items-center">
                                                {/* Lastname */}
                                                <input type="text" className="form-control py-2" placeholder="Lastname" onChange={(e) => setLastname(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Register button */}
                                        <button className='btn btn-primary w-75 p-2' onClick={handleSubmit}>Register</button>
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Login Page */}
                                        <h6 className="my-0">Already have an account? <Link to="/" style={colorTextLink}>Login</Link></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
