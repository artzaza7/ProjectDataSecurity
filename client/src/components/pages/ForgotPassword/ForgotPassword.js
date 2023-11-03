// Import Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css";
import "./ForgotPassword.css";

// import library
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Import Service
import { reset } from "../../../services/UserService";

// Import modal
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import './Modal.css'

const colorTextLink = {
  textDecoration: "none",
  color: "#0094FF",
};

function ForgotPassword() {
  // useState
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPasswor] = useState("");

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
    if (!username || !email || !password || !confirmNewPassword) {
        const missing = [];
        if (!username) missing.push("Username");
        if (!email) missing.push("Email");
        if (!password) missing.push("New Password");
        if (!confirmNewPassword) missing.push("Confirm New Password");
        setMissingFields(missing);
        setShowValidationModal(true);
        return;
      }
    if (password === confirmNewPassword) {
      var data = {
        username,
        email,
        password,
      };
      
      var checkUsername = 0;

      try {
        const response = await reset(data);
        // Success
        console.log("Reset successful : " + response.message);
        // Success reset
      } catch (error) {
        console.log(error.response.data);
        console.log("Reset not successful");
        setMissingUser(true);
        checkUsername = 1;
      }
      if(checkUsername !== 1){
        setShowSuccessModal(true);
      }
    } else {
      console.log("password !== confirmNewPassword");
      console.log("reset not successful");
      setMissingPassword(true);
    }

    // Not WithOut Checking Login & Authentication
    // navigate("/");
  }

  return (
    <div className="forgotpassword-bg">
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
                    <input
                      type="text"
                      className="form-control w-75 py-2"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* Email */}
                    <input
                      type="text"
                      className="form-control w-75 py-2"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* New Password */}
                    <input
                      type="password"
                      className="form-control w-75 py-2"
                      placeholder="New Password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* Confrim New Password */}
                    <input
                      type="password"
                      className="form-control w-75 py-2"
                      placeholder="Confrim New Password"
                      onChange={(e) => setConfirmNewPasswor(e.target.value)}
                    />
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* Change Password button */}
                    <button
                      className="btn btn-primary w-75 p-2"
                      onClick={handleShow}
                    >
                      Change Password
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
                      <Modal.Title>ยืนยันการรีเซ็ทรหัสผ่าน</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>ต้องการรีเซ็ทรหัสผ่านใช่หรือไม่</Modal.Body>
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
                      <Modal.Title>ทำการรีเซ็ทรหัสผ่านเสร็จสิ้น</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      คุณได้ทำการรีเซ็ทรหัสผ่านแล้ว
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
                      <Modal.Title>รีเซ็ทรหัสผ่านไม่สำเร็จ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      บัญชีผู้ใช้กับอีเมลไม่ตรงกันกรุณาตรวจสอบใหม่อีกครั้ง
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

export default ForgotPassword;
