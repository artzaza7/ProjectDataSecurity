import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UpdateTask.css";
import Navbar from "../Navbar/Navbar";
import Form from 'react-bootstrap/Form';
import { parseISO } from "date-fns"; // เรียกใช้ parseISO จาก date-fns

// Import API
import { getAllCategoryTasks } from "../../../services/CategoryTaskService"
import { getTaskById, editTaskById } from "../../../services/TaskService"

function UpdateTask() {
    const { id } = useParams();
    const [name, setName] = useState("")
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [category_task_id, setCategory_task_id] = useState(1);
    const [loading, setLoading] = useState(true)
    const colorTextLink = {
        textDecoration: "none",
        color: "#FFFFFF",
    };

    // for call API
    const [categoryTasks, setCategoryTasks] = useState([]);

    // useNavigate
    const navigate = useNavigate();

    async function getInitData() {
        try {
            const responseTask = await getTaskById(id)
            // console.log(responseTask)
            const data = responseTask.data

            setName(data.name)

            const dateObjectStartDate = parseISO(data.startDay)
            setStartDate(dateObjectStartDate)

            const dateObjectEndDate = parseISO(data.endDay)
            setEndDate(dateObjectEndDate)

            setStartTime(data.startHour)

            setEndTime(data.endHour)

            setCategory_task_id(data.category_task.id)
            // category
            const responseCategory = await getAllCategoryTasks();
            setCategoryTasks(responseCategory.data)

            setLoading(false)
        }
        catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getInitData()
    }, [loading]);

    async function submitUpdateTask(e) {
        e.preventDefault();
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const startDateObject = new Date(startDate)
                startDateObject.setHours(startDateObject.getHours() + 7)
                const startDate_isoString = startDateObject.toISOString()

                const endDateObject = new Date(endDate)
                endDateObject.setHours(endDateObject.getHours() + 7)
                const endDate_isoString = endDateObject.toISOString()

                var data = {
                    "name": name,
                    "startDay": startDate_isoString,
                    "startHour": startTime,
                    "endDay": endDate_isoString,
                    "endHour": endTime,
                    "category_task_id": Number(category_task_id)
                }
                // console.log(data)
                const response = await editTaskById(id, data);
                console.log(response)
                navigate("/mainscreen")
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

    const categoryOptions = categoryTasks.map((item) => (
        <option key={item.id} value={item.id}>
            {item.name}
        </option>
    ))

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
                                        <h3 className="my-0">แก้ไขกิจกรรม</h3>
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
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
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
                                    <p>ประเภทกิจกรรม</p>
                                </div>
                                <div className="row pb-3">
                                    <div className="col-12 d-flex justify-content-start align-items-center">
                                        <Form.Select aria-label="Default select example" value={category_task_id} onChange={(e) => setCategory_task_id(e.target.value)}>
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
                                        {/* update task button */}
                                        <button
                                            type="button"
                                            className="btn btn-primary px-5 mx-2"
                                            style={colorTextLink}
                                            onClick={(e) => submitUpdateTask(e)}
                                        >
                                            ยืนยันการแก้ไขกิจกรรม
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

export default UpdateTask