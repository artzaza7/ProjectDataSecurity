import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddTask.css";
import Navbar from "../Navbar/Navbar";

function AddTask() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const colorTextLink = {
    textDecoration: "none",
    color: "#FFFFFF",
  };

  return (
    <div>
        <Navbar />
      {/* Content */}
      <div className="container vh-100 d-flex justify-content-center align-items-center box-bg">
        {/* Box White */}
        <div className="container bg-white w-50 py-3 rounded">
          <div className="row h-100">
            <div className="col-12 d-flex justify-content-center align-items-center">
              {/* INSIDE Box White */}
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 mt-1 mb-4 d-flex justify-content-center align-items-center">
                    {/* Label */}
                    <h3 className="my-0">เพิ่มกิจกรรม</h3>
                  </div>
                </div>
                <div className="row">
                  <p>ชื่อกิจกรรม</p>
                </div>
                <div className="row pb-3">
                  <div className="col-6">
                    {/* Username */}
                    <input
                      type="text"
                      className="form-control py-2"
                      placeholder="กรุณากรอกชื่อกิจกรรม"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p>วันที่เริ่ม</p>
                  </div>
                  <div className="col-6">
                    <p>เวลาที่เริ่ม</p>
                  </div>
                </div>
                <div className="row pb-3">
                  <div className="col-6">
                    {/* ใช้ DatePicker กับ id="start-datepicker" */}
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="dd/mm/yyyy"
                      id="start-datepicker"
                    />
                  </div>
                  <div className="col-6">
                    {/* ใช้ TimePicker กับ id="start-time" */}
                    <TimePicker
                      onChange={(newTime) => setStartTime(newTime)}
                      value={startTime}
                      id="start-time"
                      format="HH:mm"
                      disableClock={true}
                      minTime="00:00"
                      maxTime="23:59"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p>วันที่จบ</p>
                  </div>
                  <div className="col-6">
                    <p>เวลาที่จบ</p>
                  </div>
                </div>
                <div className="row pb-3">
                  <div className="col-6">
                    {/* ใช้ DatePicker กับ id="end-datepicker" */}
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="dd/mm/yyyy"
                      id="end-datepicker"
                    />
                  </div>
                  <div className="col-6">
                    {/* ใช้ TimePicker กับ id="end-time" */}
                    <TimePicker
                      onChange={(newTime) => setEndTime(newTime)}
                      value={endTime}
                      id="end-time"
                      format="HH:mm"
                      disableClock={true}
                      minTime="00:00"
                      maxTime="23:59"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    {/* add task button */}
                    <button
                      type="button"
                      className="btn btn-primary px-5 mx-2"
                    >
                      <Link to="/index" style={colorTextLink}>เพิ่มกิจกรรม</Link>
                    </button>
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

export default AddTask;
