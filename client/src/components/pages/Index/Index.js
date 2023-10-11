import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ChartExample from "./ChartExample";
import { Link, useNavigate } from "react-router-dom";
import "./Index.css";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";

// Import Library
import jwtDecode from "jwt-decode"

// Import API
import { getUserTasksCount, getUserTasksCountFinish } from "../../../services/UserTaskService"

function Index() {
  // useNavigate
  const navigate = useNavigate();

  // for call API
  const [loading, setLoading] = useState(true)
  const [countAllTask, setCountAllTask] = useState([0, 0, 0, 0])
  const [countFinishTask, setCountFinishTask] = useState([0, 0, 0, 0])

  // Calculation %
  function calculationPercentage(numFinish, numAll) {
    let result = (numFinish * 100) / numAll;
    return result.toFixed(2)
  }

  async function getInitData() {
    const token = localStorage.getItem('token')

    if (token) {
      const username = jwtDecode(token).username
      try {
        // for count All UserTask in Pie Chart
        const responseCount = await getUserTasksCount(username)
        setCountAllTask(responseCount.data)

        // for count Finish UserTask in Pie Chart
        const responseCountFinish = await getUserTasksCountFinish(username)
        setCountFinishTask(responseCountFinish.data)

        // Finish Call API
        setLoading(false)
      }
      catch (error) {
        console.log(error.message)
      }
    }
    else {
      console.log("Don't have token")
      navigate("/")
    }
  }

  useEffect(() => {
    getInitData();
  }, [loading])

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
                <Link to="/mainscreen" style={colorTextLink}>
                  ดูกิจกรรม
                </Link>
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
                      <h5 className="card-title">
                        {!loading ? (<>จำนวนงานทั้งหมด {countAllTask[0]}</>) : ("จำนวนงานทั้งหมด")}
                      </h5>
                      <p className="card-text">
                        {!loading ? (<>จำนวนที่ทำเสร็จสิ้น {countFinishTask[0]}</>) : ("จำนวนที่ทำเสร็จสิ้น")}
                        <br />
                        {!loading ? (<>คิดเป็นเปอร์เซ็น {calculationPercentage(countFinishTask[0], countAllTask[0])} %</>) : ("คิดเป็นเปอร์เซ็น")}
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
                      <h5 className="card-title">
                        {!loading ? (<>จำนวนงานทั้งหมด {countAllTask[1]}</>) : ("จำนวนงานทั้งหมด")}
                      </h5>
                      <p className="card-text">
                        {!loading ? (<>จำนวนที่ทำเสร็จสิ้น {countFinishTask[1]}</>) : ("จำนวนที่ทำเสร็จสิ้น")}
                        <br />
                        {!loading ? (<>คิดเป็นเปอร์เซ็น {calculationPercentage(countFinishTask[1], countAllTask[1])} %</>) : ("คิดเป็นเปอร์เซ็น")}
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
                      <h5 className="card-title">
                        {!loading ? (<>จำนวนงานทั้งหมด {countAllTask[2]}</>) : ("จำนวนงานทั้งหมด")}
                      </h5>
                      <p className="card-text">
                        {!loading ? (<>จำนวนที่ทำเสร็จสิ้น {countFinishTask[2]}</>) : ("จำนวนที่ทำเสร็จสิ้น")}
                        <br />
                        {!loading ? (<>คิดเป็นเปอร์เซ็น {calculationPercentage(countFinishTask[2], countAllTask[2])} %</>) : ("คิดเป็นเปอร์เซ็น")}
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
                      <h5 className="card-title">
                        {!loading ? (<>จำนวนงานทั้งหมด {countAllTask[3]}</>) : ("จำนวนงานทั้งหมด")}
                      </h5>
                      <p className="card-text">
                        {!loading ? (<>จำนวนที่ทำเสร็จสิ้น {countFinishTask[3]}</>) : ("จำนวนที่ทำเสร็จสิ้น")}
                        <br />
                        {!loading ? (<>คิดเป็นเปอร์เซ็น {calculationPercentage(countFinishTask[3], countAllTask[3])} %</>) : ("คิดเป็นเปอร์เซ็น")}
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
