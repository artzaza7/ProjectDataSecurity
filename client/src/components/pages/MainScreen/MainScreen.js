// Import bootStrap5
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Content from './Content';
import Navbar from "../Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import './MainScreen.css';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
// Import Library
import jwtDecode from "jwt-decode"

// import API
import { getUserTasksByStatusId } from "../../../services/UserTaskService"

const minHieghtTab = {
    minHeight: '5vh'
}

class Task {
    constructor(userTask_id, task_id, task_name, task_startDay, task_startHour, task_endDay, task_endHour, category_id, category_name) {
        this.userTask_id = userTask_id
        this.task_id = task_id
        this.task_name = task_name
        this.task_startDay = task_startDay
        this.task_startHour = task_startHour
        this.task_endDay = task_endDay
        this.task_endHour = task_endHour
        this.category_id = category_id
        this.category_name = category_name
    }
}

function MainScreen() {

    const [activeTab, setActiveTab] = useState('first');

    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
    };

    // useNavigate
    const navigate = useNavigate();

    // for Data
    const [dataFinish, setDataFinish] = useState([])
    const [dataNotFinish, setDataNotFinish] = useState([])
    const [dataFail, setDataFail] = useState([])
    const [loading, setLoading] = useState(true)

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        console.log(searchValue);
    };
    // initFunction
    async function init() {
        const token = localStorage.getItem("token")
        if (token) {
            const username = jwtDecode(token).username
            try {
                // for notFinish
                const responseNotFinish = await getUserTasksByStatusId(username, 1) // 1 for notFinish
                // console.log(responseNotFinish)

                let tasks = []
                // loop for collect notFinish
                for (let i = 0; i < responseNotFinish.data.length; i++) {
                    // for each of type data
                    const item = responseNotFinish.data[i]
                    const task = item.task
                    const category = task.category_task

                    const userTask_id = item.id
                    const task_id = task.id
                    const task_name = task.name
                    const task_startDay = task.startDay
                    const task_startHour = task.startHour
                    const task_endDay = task.endDay
                    const task_endHour = task.endHour
                    const category_id = category.id
                    const category_name = category.name

                    // create Class task
                    const taskClass = new Task(userTask_id, task_id, task_name, task_startDay, task_startHour, task_endDay, task_endHour, category_id, category_name)
                    tasks.push(taskClass)
                }
                setDataNotFinish(tasks)

                // reset tasks
                tasks = []

                // for finish
                const responseFinish = await getUserTasksByStatusId(username, 2) // 2 for finish

                for (let i = 0; i < responseFinish.data.length; i++) {
                    // for each of type data
                    const item = responseFinish.data[i]
                    const task = item.task
                    const category = task.category_task

                    const userTask_id = item.id
                    const task_id = task.id
                    const task_name = task.name
                    const task_startDay = task.startDay
                    const task_startHour = task.startHour
                    const task_endDay = task.endDay
                    const task_endHour = task.endHour
                    const category_id = category.id
                    const category_name = category.name

                    // create Class task
                    const taskClass = new Task(userTask_id, task_id, task_name, task_startDay, task_startHour, task_endDay, task_endHour, category_id, category_name)
                    tasks.push(taskClass)
                }
                setDataFinish(tasks)

                // reset tasks
                tasks = []

                // for fail
                const responseFail = await getUserTasksByStatusId(username, 3) // 3 for fail

                for (let i = 0; i < responseFail.data.length; i++) {
                    // for each of type data
                    const item = responseFail.data[i]
                    const task = item.task
                    const category = task.category_task

                    const userTask_id = item.id
                    const task_id = task.id
                    const task_name = task.name
                    const task_startDay = task.startDay
                    const task_startHour = task.startHour
                    const task_endDay = task.endDay
                    const task_endHour = task.endHour
                    const category_id = category.id
                    const category_name = category.name

                    // create Class task
                    const taskClass = new Task(userTask_id, task_id, task_name, task_startDay, task_startHour, task_endDay, task_endHour, category_id, category_name)
                    tasks.push(taskClass)
                }
                setDataFail(tasks)

                setLoading(false)
            }
            catch (error) {
                console.log(error)
            }
        }
        else {
            console.log("Don't have token")
            navigate("/")
        }
    }

    // init Render
    useEffect(() => {
        init()
    }, [loading])

    return (
        <div>
            <Navbar />
            <div className="container min-vh-100">
                {/* Tabs */}
                <Tab.Container className="custom-nav-item" defaultActiveKey="first" onSelect={handleTabSelect}>
                    <Nav className="custom-nav-item" variant="pills" style={minHieghtTab}>
                        <Nav.Item className="custom-nav-item">
                            <Nav.Link eventKey="first" className='h-100 d-flex justify-content-center align-items-center' style={{ backgroundColor: activeTab === 'first' ? '#4070F4' : 'white' , color: activeTab === 'first' ? 'white' : 'black'}} >กิจกรรมที่ยังไม่เสร็จ</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="custom-nav-item">
                            <Nav.Link eventKey="second" className='h-100 d-flex justify-content-center align-items-center ' style={{ backgroundColor: activeTab === 'second' ? '#4070F4' : 'white', color: activeTab === 'second' ? 'white' : 'black' }}>กิจกรรมที่เสร็จสิ้นแล้ว</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="custom-nav-item">
                            <Nav.Link eventKey="third" className='h-100 d-flex justify-content-center align-items-center ' style={{ backgroundColor: activeTab === 'third' ? '#4070F4' : 'white', color: activeTab === 'third' ? 'white' : 'black' }}>กิจกรรมที่ล้มเหลว</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="custom-nav-item d-flex" style={{ marginLeft: 'auto' }}>
                            <Form>
                                <InputGroup>
                                    <FormControl
                                        type="text"
                                        placeholder="ค้นหา"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </InputGroup>
                            </Form>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content className='d-flex justify-content-center align-items-center w-100'>
                        <Tab.Pane eventKey="first" className='w-100'>

                            {!loading ? <Content mode="notFinish" data={dataNotFinish} searchValue={searchValue}/> : <div>LOADING</div>}

                        </Tab.Pane>

                        <Tab.Pane eventKey="second" className='w-100'>

                            {!loading ? <Content mode="Finish" data={dataFinish} searchValue={searchValue}/> : <div>LOADING</div>}

                        </Tab.Pane>

                        <Tab.Pane eventKey="third" className='w-100'>

                            {!loading ? <Content mode="Fail" data={dataFail} searchValue={searchValue} /> : <div>LOADING</div>}

                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    );
}

export default MainScreen;