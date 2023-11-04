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
import './Modal.css'

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
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [showErrorModal, setShowErrorModal] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const divStyle = {
    fontSize: '0.7rem', 
    color: "red",
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
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

      if(!isValidPassword){
        setErrorMessage("รหัสผ่านมีลักษณะไม่ถูกต้อง กรุณาตรวจสอบใหม่อีกครั้ง");
        setShowErrorModal(true);
        return;
      }
      if(!isValidEmail){
        setErrorMessage("อีเมลมีลักษณะไม่ถูกต้อง กรุณาตรวจสอบใหม่อีกครั้ง");
        setShowErrorModal(true);
        return;
      }


      try {
        const response = await register(data);
        // Success
        if(response.message === "User registration successful"){
          setShowSuccessModal(true);
        }
        // Success Register
      } catch (error) {
        setMissingUser(true);
      }
      
    } else {
      // Invalid (cPassword !== password)
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
                    {/* Password */}
                    <input
                      type="password"
                      className="form-control w-75 py-2"
                      placeholder="Password"
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
                          setPassword(inputValue);
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
                    {/* C_Password */}
                    <input
                      type="password"
                      className="form-control w-75 py-2"
                      placeholder="Confirm password"
                      onKeyDown={(e) => {
                        if (cPassword.length >= 35 && e.key !== 'Backspace' && e.key !== 'Delete') {
                          e.preventDefault();
                        }
                      }}
                      onPaste={(e) => {
                        const pastedText = e.clipboardData.getData('text');
                        if (pastedText.length + cPassword.length > 35) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue.length <= 35) {
                          setCPassword(inputValue);
                        }
                      }}
                    />
                  </div>
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* Email */}
                    <input
                      type="email"
                      className={`form-control w-75 py-2 ${isValidEmail ? "" : "is-invalid"}`}
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
                    
                    <div className="row w-75">
                      <div className="col-6 ps-0 d-flex justify-content-center align-items-center">
                        {/* Firstname */}
                        <input
                          type="text"
                          className="form-control py-2"
                          placeholder="Firstname"
                          onKeyDown={(e) => {
                            if (firstname.length >= 35 && e.key !== 'Backspace' && e.key !== 'Delete') {
                              e.preventDefault();
                            }
                          }}
                          onPaste={(e) => {
                            const pastedText = e.clipboardData.getData('text');
                            if (pastedText.length + firstname.length > 35) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue.length <= 35) {
                              setFirstname(inputValue);
                            }
                          }}
                        />
                      </div>
                      <div className="col-6 pe-0 d-flex justify-content-center align-items-center">
                        {/* Lastname */}
                        <input
                          type="text"
                          className="form-control py-2"
                          placeholder="Lastname"
                          onKeyDown={(e) => {
                            if (lastname.length >= 35 && e.key !== 'Backspace' && e.key !== 'Delete') {
                              e.preventDefault();
                            }
                          }}
                          onPaste={(e) => {
                            const pastedText = e.clipboardData.getData('text');
                            if (pastedText.length + lastname.length > 35) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (inputValue.length <= 35) {
                              setLastname(inputValue);
                            }
                          }}
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
                      บัญชีผู้ใช้หรืออีเมลนี้มีอยู่แล้วกรุณาใช้ตรวจสอบใหม่อีกครั้ง
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
                  <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>สมัครไม่สำเร็จ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{errorMessage}</Modal.Body>
                    <Modal.Footer>
                      <button className="btn btn-primary" onClick={handleCloseErrorModal}>
                        ปิด
                      </button>
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
