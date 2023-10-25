// Import Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

// import library
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Import Service
import { register } from "../../../services/UserService";

// Import modal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import './Modal.css';

const colorTextLink = {
  textDecoration: "none",
  color: "#0094FF",
};

function Register() {
  // useState
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  // validation
  const [show, setShow] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [missingPassword, setMissingPassword] = useState(false);
  const [missingUser, setMissingUser] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useNavigate
  const navigate = useNavigate();

  async function handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    if (!username || !password || !cPassword || !email || !firstname || !lastname) {
      const missing = [];
      if (!username) missing.push("Username");
      if (!password) missing.push("Password");
      if (!cPassword) missing.push("Confirm Password");
      if (!email) missing.push("Email");
      if (!firstname) missing.push("Firstname");
      if (!lastname) missing.push("Lastname");
      setMissingFields(missing);
      setShowValidationModal(true);
      return;
    }

    // checking cPassword === Password ??
    if (cPassword === password) {
      // Valid
      var data = {
        username,
        password,
        email,
        firstname,
        lastname,
      };
      // console.log(data);

      var checkUsername = 0;
      

      try {
        const response = await register(data);
        // console.log(response);
        // Success
        console.log("Register successful : " + response.message);
        // Success Register
      } catch (error) {
        console.log(error.response.data.message);
        console.log("Register1 not successful");
        setMissingUser(true);
        checkUsername = 1;
      }
      if(checkUsername != 1){
        setShowSuccessModal(true);
      }
    } else {
      // Invalid (cPassword !== password)
      console.log("cPassword !== password");
      console.log("Register not successful");
      setMissingPassword(true);
    }
  }

  return (
    <div className="register-bg">
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
                    {/* C_Password */}
                    <input
                      type="password"
                      className="form-control w-75 py-2"
                      placeholder="Confirm password"
                      onChange={(e) => setCPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* Email */}
                    <input
                      type="email"
                      className="form-control w-75 py-2"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* Email */}
                    <div className="row w-75">
                      <div className="col-6 ps-0 d-flex justify-content-center align-items-center">
                        {/* Firstname */}
                        <input
                          type="text"
                          className="form-control py-2"
                          placeholder="Firstname"
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                      </div>
                      <div className="col-6 pe-0 d-flex justify-content-center align-items-center">
                        {/* Lastname */}
                        <input
                          type="text"
                          className="form-control py-2"
                          placeholder="Lastname"
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* Register button */}
                    <button
                      className="btn btn-primary w-75 p-2"
                      onClick={handleShow}
                    >
                      Register
                    </button>
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* Login Page */}
                    <h6 className="my-0">
                      Already have an account?{" "}
                      <Link to="/" style={colorTextLink}>
                        Login
                      </Link>
                    </h6>
                  </div>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>ยืนยันการสมัครสมาชิก</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>ต้องการสมัครสมาชิกใช่หรือไม่</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        ยกเลิก
                      </Button>
                      <Button
                        variant="primary"
                        onClick={(e) => {
                          handleSubmit(e);
                          handleClose();
                        }}
                      >
                        ตกลง
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Modal
                    show={showSuccessModal}
                    onHide={() => setShowSuccessModal(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>ทำการสมัครสมาชิกเสร็จสิ้น</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      คุณได้ทำการสมัครสมาชิกแล้ว
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setShowSuccessModal(false);
                          navigate("/");
                        }}
                      >
                        ตกลง
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Modal
                    show={showValidationModal}
                    onHide={() => setShowValidationModal(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>ข้อมูลไม่ครบ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      กรุณากรอกข้อมูลให้ครบถ้วน:
                      <ul>
                        {missingFields.map((field, index) => (
                          <li key={index} className="text-danger">{field}</li>
                        ))}
                      </ul>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="danger"
                        onClick={() => setShowValidationModal(false)}
                      >
                        ปิด
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Modal
                    show={missingPassword}
                    onHide={() => setMissingPassword(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>รหัสผ่านไม่ถูกต้อง</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      รหัสผ่านไม่ตรงกันกรุณาตรวจสอบใหม่อีกครั้ง
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="danger"
                        onClick={() => setMissingPassword(false)}
                      >
                        ปิด
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Modal
                    show={missingUser}
                    onHide={() => setMissingUser(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>สมัครไม่สำเร็จ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      บัญชีผู้ใช้นี้มีอยู่แล้วกรุณาใช้ตรวจสอบใหม่อีกครั้ง
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="danger"
                        onClick={() => setMissingUser(false)}
                      >
                        ปิด
                      </Button>
                    </Modal.Footer>
                  </Modal>
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
