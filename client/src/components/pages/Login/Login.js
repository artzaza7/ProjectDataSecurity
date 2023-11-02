// Import Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css";

// import CSS
import "./Login.css";
import './Modal.css';

// import library
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../../services/UserService";
import { Modal } from "react-bootstrap";

const colorTextLink = {
  textDecoration: "none",
  color: "#0094FF",
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false); // เพิ่มสถานะสำหรับ Modal
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // เมื่อปิด Modal
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      username,
      password,
    };

    try {
      const response = await login(data);
      console.log("Login successful: " + response.message);
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/index");
    } catch (error) {
      console.log(error.message);
      console.log("Login not successful");
      if(error.message === "Request failed with status code 401")
        setErrorMessage("โปรดตรวจสอบ Username และ Password");
      setShowErrorModal(true); // เมื่อเข้าสู่ระบบไม่สำเร็จ แสดง Modal
    }
  }

  return (
    <div className="login-bg">
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
                    <input
                      type="text"
                      className="form-control w-75 py-2"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* Password */}
                    <input
                      type="password"
                      className="form-control w-75 py-2"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* Link */}
                    <h6 className="my-0">
                      <Link to="/forgotpassword" style={colorTextLink}>
                        Forgot Password?
                      </Link>
                    </h6>
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* Login button */}
                    <button
                      className="btn btn-primary w-75 p-2"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* Register Page */}
                    <h6 className="my-0">
                      Don't have an account?{" "}
                      <Link to="/register" style={colorTextLink}>
                        Register
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>เข้าสู่ระบบไม่สำเร็จ</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleCloseErrorModal}>
            ปิด
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>เข้าสู่ระบบไม่สำเร็จ</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleCloseErrorModal}>
            ปิด
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
