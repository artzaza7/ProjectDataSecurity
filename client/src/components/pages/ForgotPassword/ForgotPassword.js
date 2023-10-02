// Import Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css';

// import library
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const colorTextLink = {
    textDecoration: "none",
    color: '#0094FF'
};

function ForgotPassword() {

    // useState
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPasswor] = useState('')

    // useNavigate
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        var json = {
            username,
            email,
            newPassword,
            confirmNewPassword
        }
        console.log(json);

        // Not WithOut Checking Login & Authentication
        navigate('/')
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
                                        <h3 className="my-0">Change Password</h3>
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Username */}
                                        <input type="text" className="form-control w-75 py-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Email */}
                                        <input type="text" className="form-control w-75 py-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* New Password */}
                                        <input type="password" className="form-control w-75 py-2" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Confrim New Password */}
                                        <input type="password" className="form-control w-75 py-2" placeholder="Confrim New Password" onChange={(e) => setConfirmNewPasswor(e.target.value)} />
                                    </div>
                                    <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                                        {/* Change Password button */}
                                        <button className='btn btn-primary w-75 p-2' onClick={handleSubmit}>Change Password</button>
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

export default ForgotPassword;
