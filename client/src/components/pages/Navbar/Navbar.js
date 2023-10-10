import React from "react";
import './Navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

// import library
import { useNavigate } from 'react-router-dom';

function Navbar() {
  // useNavigate
  const navigate = useNavigate();


  function logout() {
    // Clearing Item
    localStorage.removeItem("token")

    // Back to Login Page
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="container justify-content-center">
        <div className="row w-100">
          <div className="col-12 d-flex justify-content-end align-items-center">
            <i className="bi bi-person-circle bi-2x"></i>
            ชนกานต์ ศรีศรุติพร
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split variant="" id="dropdown-split-basic" />
              <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
