import React, { useEffect, useState } from "react";
import './Navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate, Link } from 'react-router-dom';

// import library
import jwtDecode from 'jwt-decode'

// import API
import { getUserbyUsername } from '../../../services/UserService'
import { tokenVerify } from "../../../services/UserService"

function Navbar() {
  // useNavigate
  const navigate = useNavigate();

  const [fullname, setFullname] = useState('')
  const [loading, setLoading] = useState(true)

  function logout() {
    // Back to Login Page
    navigate("/")
  }

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          await tokenVerify(token)
        }
        catch (error) {
          console.log(error.message)
          window.location.href = 'http://localhost:3000/unauthorized'
        }
        const username = jwtDecode(token).username
        const exp = jwtDecode(token).exp
        if (Date.now() >= exp * 1000) {
          window.location.href = 'http://localhost:3000/unauthorized'
        }
        try {
          const responseUser = await getUserbyUsername(username)
          const f_name = responseUser.data.firstname + " " + responseUser.data.lastname
          setFullname(f_name)
          setLoading(false)
        }
        catch (error) {
        }
      }
      else {
        window.location.href = 'http://localhost:3000/unauthorized'
      }
    }
    return () => {
      init()
    }
  }, [])
  return (
    <nav className="navbar">
      <div className="container justify-content-center">
        <div className="row w-100">
          <div className="col-4 d-flex justify-content-between align-items-center">
            <Link to="/index" className="text-white" style={{ textDecoration: 'none' }}>แดชบอร์ด</Link>
            <Link to="/addtask" className="text-white" style={{ textDecoration: 'none' }}>เพิ่มกิจกรรม</Link>
            <Link to="/mainscreen" className="text-white" style={{ textDecoration: 'none' }}>ดูกิจกรรม</Link>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <i className="bi bi-person-circle bi-2x"></i>
            {!loading ? fullname : "Firstname Lastname"}
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
