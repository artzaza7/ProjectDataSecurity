// Import bootStrap5
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Content from './Content';
import Navbar from "../Navbar/Navbar";
import './MainScreen.css';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
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

    // for Data
    const [dataFinish, setDataFinish] = useState([])
    const [dataNotFinish, setDataNotFinish] = useState([])
    const [dataFail, setDataFail] = useState([])
    const [loading, setLoading] = useState(true)

    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState('task_name');

    // init Render
    useEffect(() => {

        // initFunction
        async function init() {
            const token = localStorage.getItem("token")
            if (token) {
                const username = jwtDecode(token).username
                const exp = jwtDecode(token).exp
                if (Date.now() >= exp * 1000) {
                    window.location.href = 'http://localhost:3000/unauthorized'
                }
                try {
                    // for notFinish
                    const responseNotFinish = await getUserTasksByStatusId(username, 1) // 1 for notFinish

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
        <div>
            <Navbar />
            <div className="container min-vh-100">
                

                {/* Tabs */}
                <Tab.Container className="custom-nav-item" defaultActiveKey="first" onSelect={handleTabSelect}>
                    <Nav className="custom-nav-item" variant="pills" style={minHieghtTab} >
                        <Nav.Item className="custom-nav-item">
                            <Nav.Link eventKey="first" className='h-100 d-flex justify-content-center align-items-center' style={{ backgroundColor: activeTab === 'first' ? '#4070F4' : 'white', color: activeTab === 'first' ? 'white' : 'black' }} >กิจกรรมที่ยังไม่เสร็จ</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="custom-nav-item">
                            <Nav.Link eventKey="second" className='h-100 d-flex justify-content-center align-items-center ' style={{ backgroundColor: activeTab === 'second' ? '#4070F4' : 'white', color: activeTab === 'second' ? 'white' : 'black' }}>กิจกรรมที่เสร็จสิ้นแล้ว</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="custom-nav-item">
                            <Nav.Link eventKey="third" className='h-100 d-flex justify-content-center align-items-center ' style={{ backgroundColor: activeTab === 'third' ? '#4070F4' : 'white', color: activeTab === 'third' ? 'white' : 'black' }}>กิจกรรมที่ล้มเหลว</Nav.Link>
                        </Nav.Item>
                        <Tab.Container className="custom-nav-item2" >
                            <Nav className="custom-nav-item2" variant="pills" style={{ ...minHieghtTab, marginLeft: 'auto' }}>
                                <Nav.Item className="custom-nav-item2 d-flex" style={{ marginLeft: 'auto' }}>
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
                                <Nav.Item className="custom-nav-item2 d-flex">
                                    <Dropdown onSelect={(eventKey) => { setSearchType(eventKey); setSearchValue(''); }}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {searchType === 'task_name' ? 'ค้นหาตามชื่องาน' :
                                                searchType === 'dateStart' ? 'ค้นหาตามวันเริ่ม' :
                                                    searchType === 'dateEnd' ? 'ค้นหาตามวันสิ้นสุด' : 'เลือกประเภทการค้นหา'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="task_name">ค้นหาตามชื่องาน</Dropdown.Item>
                                            <Dropdown.Item eventKey="dateStart">ค้นหาตามวันเริ่ม</Dropdown.Item>
                                            <Dropdown.Item eventKey="dateEnd">ค้นหาตามวันสิ้นสุด</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Nav.Item>
                            </Nav>
                        </Tab.Container>
                    </Nav>
                    <Tab.Content className='d-flex justify-content-center align-items-center w-100'>
                        <Tab.Pane eventKey="first" className='w-100'>

                            {!loading ? <Content mode="notFinish" data={dataNotFinish} searchValue={searchValue} searchType={searchType}/> : <div>LOADING</div>}

                        </Tab.Pane>

                        <Tab.Pane eventKey="second" className='w-100'>

                            {!loading ? <Content mode="Finish" data={dataFinish} searchValue={searchValue} searchType={searchType}/> : <div>LOADING</div>}

                        </Tab.Pane>

                        <Tab.Pane eventKey="third" className='w-100'>

                            {!loading ? <Content mode="Fail" data={dataFail} searchValue={searchValue} searchType={searchType}/> : <div>LOADING</div>}

                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    );
}

export default MainScreen;