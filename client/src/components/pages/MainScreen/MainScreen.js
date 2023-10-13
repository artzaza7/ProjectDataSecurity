// Import bootStrap5
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Content from './Content';
import Navbar from "../Navbar/Navbar";
import { useNavigate } from 'react-router-dom';

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
    const [loading, setLoading] = useState(true)

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
                <Tab.Container defaultActiveKey="first" onSelect={handleTabSelect}>
                    <Nav variant="pills" style={minHieghtTab}>
                        <Nav.Item>
                            <Nav.Link eventKey="first" className='h-100 d-flex justify-content-center align-items-center text-dark' style={{ backgroundColor: activeTab === 'first' ? 'white' : 'grey' }} >กิจกรรมที่ยังไม่เสร็จ</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second" className='h-100 d-flex justify-content-center align-items-center text-dark' style={{ backgroundColor: activeTab === 'second' ? 'white' : 'grey' }}>กิจกรรมที่เสร็จสิ้นแล้ว</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content className='bg-white d-flex justify-content-center align-items-center w-100'>
                        <Tab.Pane eventKey="first" className='w-100'>

                            {!loading ? <Content mode="notFinish" data={dataNotFinish} /> : <div>LOADING</div>}

                        </Tab.Pane>

                        <Tab.Pane eventKey="second" className='w-100'>

                            {!loading ? <Content mode="Finish" data={dataFinish} /> : <div>LOADING</div>}

                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    );
}

export default MainScreen;