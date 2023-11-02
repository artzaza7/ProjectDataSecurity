import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./ErrorPage.css";
function ErrorPage() {
  return (
    <div>
      <div className="error-bg">
        {/* Content */}
        <div className="container vh-100 d-flex justify-content-center align-items-center">
          {/* Box White */}
          <div className="container bg-white h-75 w-75 py-3 rounded bg-img">
            <Link to="/">
              <button className="btn btn-primary p-2 d-flex justify-content-center align-items-center">
                กลับไปที่หน้าหลัก
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
