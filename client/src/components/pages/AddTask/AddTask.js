import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddTask.css";
import Navbar from "../Navbar/Navbar";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Modal.css";
import { format } from 'date-fns';

// Import Library
import jwtDecode from "jwt-decode";

// Import API
import { getAllCategoryTasks } from "../../../services/CategoryTaskService";
import { createUserTask } from "../../../services/UserTaskService";
import { tokenVerify } from "../../../services/UserService"

function AddTask() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [category_task_id, setCategory_task_id] = useState(1);
  const [show, setShow] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showValidationDate, setShowValidationDate] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const colorTextLink = {
    textDecoration: "none",
    color: "#FFFFFF",
  };
  const divStyle = {
    fontSize: '0.7rem', 
    color: "red",
  };

  // for call API
  const [categoryTasks, setCategoryTasks] = useState([]);

  // useNavigate
  const navigate = useNavigate();

  function settingStartDate(date) {
    setStartDate(date);
  }

  async function getInitData() {
    try {
      const response = await getAllCategoryTasks();
      setCategoryTasks(response.data);
    } catch (error) {
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1000 มิลลิวินาทีหรือ 1 วินาที

    // คืนค่าฟังก์ชันที่จะทำการล้างตัวจับเวลาเมื่อ component unmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    getInitData();
  }, []);

  async function submitCreateTask(e) {
    // ตรวจสอบ e และเรียก preventDefault ถ้าเป็นไปได้

    if (e) {
      e.preventDefault();
    }
    if (!name || !startDate || !startTime || !endDate || !endTime) {
      const missing = [];
      if (!name) missing.push("ชื่อกิจกรรม");
      if (!startDate) missing.push("วันที่เริ่ม");
      if (!startTime) missing.push("เวลาที่เริ่ม");
      if (!endDate) missing.push("วันที่จบ");
      if (!endTime) missing.push("เวลาที่จบ");
      setMissingFields(missing);
      setShowValidationModal(true);
      return;
    }
    
    // check date and time
    const formattedDateNow = format(currentTime, 'dd/MM/yyyy');
    const formattedEndDate = format(endDate, 'dd/MM/yyyy');

    if (formattedEndDate < formattedDateNow) {
      setShowValidationDate(true);
      return;
    }
    if (startDate > endDate) {
      setShowValidationDate(true);
      return;
    }
    if ((startDate >= endDate && startDate <= endDate)) {
      if (formattedEndDate === formattedDateNow) {
        if (startTime >= endTime) {
          setShowValidationDate(true);
          return;
        } else if (startTime < endTime) {
          if (
            endTime <=
            currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          ) {
            setShowValidationDate(true);
            return;
          }
        }
      }
      if (formattedEndDate < formattedDateNow) {
        setShowValidationDate(true);
        return;
      }
      if (formattedEndDate > formattedDateNow) {
        if (startTime >= endTime) {
          setShowValidationDate(true);
          return;
        }
      }
    }
    if (formattedEndDate === formattedDateNow) {
      if (endTime <= currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })) {
        setShowValidationDate(true);
        return;
      }
    }
    

    const token = localStorage.getItem("token");
    if (token) {
      try {
        await tokenVerify(token)
      }
      catch (error) {
        window.location.href = 'http://localhost:3000/unauthorized'
      }

      const username = jwtDecode(token).username;
      const exp = jwtDecode(token).exp
      if(Date.now() >= exp * 1000){
        navigate("/unauthorized")
      }
      try {
        const startDateObject = new Date(startDate);
        startDateObject.setHours(startDateObject.getHours() + 7);
        const startDate_isoString = startDateObject.toISOString();

        const endDateObject = new Date(endDate);
        endDateObject.setHours(endDateObject.getHours() + 7);
        const endDate_isoString = endDateObject.toISOString();

        var data = {
          name: name,
          startDay: startDate_isoString,
          startHour: startTime,
          endDay: endDate_isoString,
          endHour: endTime,
          category_task_id: Number(category_task_id),
        };
        const response = await createUserTask(username, data);
        setShowSuccessModal(true);
      } catch (error) {
      }
    } else {
      navigate("/");
    }
  }

  const categoryOptions = categoryTasks.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

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
                      className="form-control py-2 input-group has-validation"
                      placeholder="กรุณากรอกชื่อกิจกรรม"
                      onKeyDown={(e) => {
                        if (name.length >= 35 && e.key !== 'Backspace' && e.key !== 'Delete') {
                          e.preventDefault();
                        }
                      }}
                      onPaste={(e) => {
                        const pastedText = e.clipboardData.getData('text');
                        if (pastedText.length + name.length > 35) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue.length <= 35) {
                          setName(inputValue);
                        }
                      }}
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
                      onChange={(date) => settingStartDate(date)}
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
                  <div style={divStyle} className="d-flex justify-content-start align-items-start">**วันและเวลาที่จบต้องมากกว่าวันและเวลาปัจจุบันเสมอ**</div>
                </div>
                <div className="row">
                  <p>ประเภทกิจกรรม</p>
                </div>
                <div className="row pb-3">
                  <div className="col-12 d-flex justify-content-start align-items-center">
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => setCategory_task_id(e.target.value)}
                    >
                      {categoryOptions}
                    </Form.Select>
                  </div>
                </div>
                <div className="row">
                  {/* <div className="col-6 my-2 d-flex justify-content-center align-items-center">
                    <button
                      type="button"
                      className="btn btn-warning px-5 mx-2"
                    >
                      <Link to="/index" style={colorTextLink}>กลับหน้าหลัก</Link>
                    </button>
                  </div> */}
                  <div className="col-12 my-2 d-flex justify-content-center align-items-center">
                    <button
                      type="button"
                      className="btn btn-primary px-5 mx-2"
                      style={colorTextLink}
                      onClick={handleShow} // Use the handleShow function here
                    >
                      เพิ่มกิจกรรม
                    </button>
                  </div>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>ยืนยันการเพิ่มกิจกรรม</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>ต้องการเพิ่มกิจกรรมใช่หรือไม่</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        ยกเลิก
                      </Button>
                      <Button
                        variant="primary"
                        onClick={(e) => {
                          submitCreateTask(e);
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
                      <Modal.Title>ทำการเพิ่มกิจกรรมแล้ว</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      กิจกรรมของคุณได้ถูกเพิ่มเรียบร้อยแล้ว
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setShowSuccessModal(false);
                          window.location.reload(true); // รีเฟรชหน้า
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
                          <li key={index} className="text-danger">
                            {field}
                          </li>
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
                    show={showValidationDate}
                    onHide={() => setShowValidationDate(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>เพิ่มกิจกรรมไม่สำเร็จ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>กรุณาตรวจสอบเวลาและวันที่</Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="danger"
                        onClick={() => setShowValidationDate(false)}
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

export default AddTask;
