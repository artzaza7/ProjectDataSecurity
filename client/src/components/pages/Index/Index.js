import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ChartExample from "./ChartExample";
import { Link } from "react-router-dom";
import "./Index.css";
import Navbar from "../Navbar/Navbar";

function Index() {
  const divStyle = {
    backgroundColor: "#EEEEEE",
  };
  const divStyle2 = {
    backgroundColor: "#EEEEEE",
  };
  const colorTextLink = {
    textDecoration: "none",
    color: "#FFFFFF",
  };

  return (
    <div>
      <Navbar />
        <div className="container vh-100" style={divStyle}>
          <div className="row p-5">
            <div className="col-5 p-5 container" style={divStyle2}>
              <ChartExample />
              <div className="p-3 mt-5 d-flex justify-content-center align-items-center">
                <button type="button" className="btn btn-warning  px-5 mx-2">
                  ดูกิจกรรม
                </button>
                <button type="button" className="btn btn-success  px-5 mx-2">
                  <Link to="/addtask" style={colorTextLink}>
                    เพิ่มกิจกรรม
                  </Link>
                </button>
              </div>
            </div>
            <div className="col-7 p-5 container">
              <div className="row p-4">
                <div className="col-6">
                  <div className="container">
                    <div className="card btn-type1">
                      <div className="card-header btn-type1 text-center">
                        ประเภท 1
                      </div>
                      <div className="card-body text-center">
                        <br />
                        <br />
                        <br />
                        <h5 className="card-title">จำนวนงานทั้งหมด</h5>
                        <p className="card-text">
                          จำนวนที่ทำเสร็จสิ้น
                          <br />
                          คิดเป็นเปอร์เซ็น
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="container">
                    <div className="card btn-type2 text-center">
                      <div className="card-header bg-transparent btn-type2 text-center">
                        ประเภท 2
                      </div>
                      <div className="card-body">
                        <br />
                        <br />
                        <br />
                        <h5 className="card-title">จำนวนงานทั้งหมด</h5>
                        <p className="card-text">
                          จำนวนที่ทำเสร็จสิ้น
                          <br />
                          คิดเป็นเปอร์เซ็น
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row p-4">
                <div className="col-6">
                  <div className="container">
                    <div className="card btn-type3 text-center">
                      <div className="card-header bg-transparent btn-type3 text-center">
                        ประเภท 3
                      </div>
                      <div className="card-body">
                        <br />
                        <br />
                        <br />
                        <h5 className="card-title">จำนวนงานทั้งหมด</h5>
                        <p className="card-text">
                          จำนวนที่ทำเสร็จสิ้น
                          <br />
                          คิดเป็นเปอร์เซ็น
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="container">
                    <div className="card btn-type4 text-center">
                      <div className="card-header bg-transparent btn-type4 text-center">
                        ประเภท 4
                      </div>
                      <div className="card-body">
                        <br />
                        <br />
                        <br />
                        <h5 className="card-title">จำนวนงานทั้งหมด</h5>
                        <p className="card-text">
                          จำนวนที่ทำเสร็จสิ้น
                          <br />
                          คิดเป็นเปอร์เซ็น
                        </p>
                      </div>
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

export default Index;
