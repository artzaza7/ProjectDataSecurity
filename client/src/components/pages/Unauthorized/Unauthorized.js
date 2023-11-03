import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";

import "./Unauthorized.css";
function Unauthorized() {
  return (
    <div>
      <div className="error-bg bg-img2 vh-100">
        <div className="d-flex justify-content-center align-items-end vh-100 pb-5">
          <Link to="/">
            <button className="btn btn-primary p-2 ">
              กลับไปที่หน้าหลัก
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
