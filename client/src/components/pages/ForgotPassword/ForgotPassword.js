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

const divStyle = {
  fontSize: '0.7rem', 
  color: "red",
};

const checkPasswordValidity = (inputValue) => {
  if (
    inputValue.length >= 8 &&
    /[a-z]/.test(inputValue) && 
    /[A-Z]/.test(inputValue) && 
    /\d/.test(inputValue) &&    
    /[!@#$%^&*()_+[\]{};:"'<>,.?~\\/\-|=]/.test(inputValue)
  )
  return inputValue;
};

function ForgotPassword() {
  // useState
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPasswor] = useState("");

  // validation
  const [show, setShow] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  
  const [showErrorModal, setShowErrorModal] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // เมื่อปิด Modal
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };
  const checkEmailValidity = (input) => {
    // Regular Expression for a valid email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(input);
  };
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
      if(!isValidPassword){
        setErrorMessage("รหัสผ่านมีลักษณะไม่ถูกต้อง กรุณาตรวจสอบใหม่อีกครั้ง");
        setShowErrorModal(true);
        return;
      }

      try {
        const response = await reset(data);
        // Success
        if(response.message === "Username is locked. Please try again tomorrow."){
          setErrorMessage("ยูสเซอร์ไอดีนี้ถูกล็อก กรุณารอ 24 ชั่วโมงเพื่อรีเซ็ทรหัสผ่านใหม่อีกครั้ง");
          setShowErrorModal(true);
        }else if(response.message === "Email is locked. Please try again tomorrow."){
          setErrorMessage("อีเมลนี้ถูกล็อก กรุณารอ 24 ชั่วโมงเพื่อรีเซ็ทรหัสผ่านใหม่อีกครั้ง");
          setShowErrorModal(true);
        }else if(response.message === "Password reset successful"){
          setShowSuccessModal(true);
        }
        // Success reset
      } catch (error) {
        if(error.message === "Request failed with status code 404"){
          setErrorMessage("ไม่พบยูสเซอร์ไอดีนี้");
          setShowErrorModal(true);
        }else if(error.message === "Request failed with status code 401"){
          setErrorMessage("ยูสเซอร์ไอดีหรืออีเมลไม่ถูกต้อง กรุณาตรวจสอบใหม่อีกครั้ง");
          setShowErrorModal(true); 
        }else if(error.message === "Request failed with status code 400"){
          setErrorMessage("โปรดตรวจสอบอีเมลใหม่อีกครั้งหากใส่อีเมลผิดครบ 10 ครั้งไอดีนี้ถูกล็อกเป็นเวลา 24 ชั่วโมง");
          setShowErrorModal(true); 
        }
      }
      
    } else {
      setErrorMessage("รหัสผ่านไม่ตรงกัน");
      setShowErrorModal(true); 
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
                      onKeyDown={(e) => {
                        if (username.length >= 35 && e.key !== 'Backspace' && e.key !== 'Delete') {
                          e.preventDefault();
                        }
                      }}
                      onPaste={(e) => {
                        const pastedText = e.clipboardData.getData('text');
                        if (pastedText.length + username.length > 35) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue.length <= 35) {
                          setUsername(inputValue);
                        }
                      }}
                    />
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* Email */}
                    <input
                      type="text"
                      className="form-control w-75 py-2"
                      placeholder="Email"
                      value={email}
                      onKeyDown={(e) => {
                        if (email.length >= 35 && e.key !== 'Backspace' && e.key !== 'Delete') {
                          e.preventDefault();
                        }
                      }}
                      onPaste={(e) => {
                        const pastedText = e.clipboardData.getData('text');
                        if (pastedText.length + email.length > 35) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue.length <= 35) {
                          setEmail(inputValue);
                        }
                        setIsValidEmail(checkEmailValidity(inputValue));
                      }}
                    />
                  </div>
                  {!isValidEmail && (
                      <div className="invalid-feedback d-flex justify-content-center align-items-start">
                        รูปแบบอีเมลไม่ถูกต้อง
                      </div>
                    )}
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* New Password */}
                    <input
                      type="password"
                      className="form-control w-75 py-2"
                      placeholder="New Password"
                      onKeyDown={(e) => {
                        if (password.length >= 35 && e.key !== 'Backspace' && e.key !== 'Delete') {
                          e.preventDefault();
                        }
                      }}
                      onPaste={(e) => {
                        const pastedText = e.clipboardData.getData('text');
                        if (pastedText.length + password.length > 35) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue.length <= 35) {
                          setNewPassword(inputValue);
                        }
                        setIsValidPassword(checkPasswordValidity(inputValue));
                      }}
                    />
                  </div>
                  <div style={divStyle} className="d-flex justify-content-center align-items-start">**รหัสต้องมีตัวพิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข ตัวอักษรพิเศษและรวมมากว่า 8 ตัว เช่น Aa@1bbbb**</div>
                  {!isValidPassword && (
                      <div className="invalid-feedback d-flex justify-content-center align-items-start">
                        รูปแบบรหัสผ่านไม่ถูกต้อง
                      </div>
                    )}
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* Confrim New Password */}
                    <input
                      type="password"
                      className="form-control w-75 py-2"
                      placeholder="Confrim New Password"
                      onKeyDown={(e) => {
                        if (confirmNewPassword.length >= 35 && e.key !== 'Backspace' && e.key !== 'Delete') {
                          e.preventDefault();
                        }
                      }}
                      onPaste={(e) => {
                        const pastedText = e.clipboardData.getData('text');
                        if (pastedText.length + confirmNewPassword.length > 35) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue.length <= 35) {
                          setConfirmNewPasswor(inputValue);
                        }
                      }}
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
                  <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>รีเซ็ทรหัสผ่านไม่สำเร็จ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{errorMessage}</Modal.Body>
                    <Modal.Footer>
                      <button className="btn btn-primary" onClick={handleCloseErrorModal}>
                        ปิด
                      </button>
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
                      คุณได้ทำการีเซ็ทรหัสผ่านแล้ว
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
