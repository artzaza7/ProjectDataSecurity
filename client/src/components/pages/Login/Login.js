// Import Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css';

// import CSS
import './Login.css';


// import library
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const colorTextLink = {
    textDecoration: "none",
    color: '#0094FF'
};

function Login() {
    // useState
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // useNavigate
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        var json = {
            username,
            password
        }
        console.log(json);

        // Not WithOut Checking Login & Authentication
        navigate('/index')
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
                                        <h3 className="my-0">Login</h3>
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Username */}
                                        <input type="text" className="form-control w-75 py-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Password */}
                                        <input type="password" className="form-control w-75 py-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Link */}
                                        <h6 className="my-0"><Link to="/forgotpassword" style={colorTextLink}>Forgot Password?</Link></h6>
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Login button */}
                                        <button className='btn btn-primary w-75 p-2' onClick={handleSubmit}>Login</button>
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Register Page */}
                                        <h6 className="my-0">Don't have an account? <Link to="/register" style={colorTextLink}>Register</Link></h6>
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

export default Login;
