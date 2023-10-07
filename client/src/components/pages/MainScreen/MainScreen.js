// Import bootStrap5
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Content from './Content';
import Navbar from "../Navbar/Navbar";


const minHieghtTab = {
    minHeight: '5vh'
}


function MainScreen() {

    const [activeTab, setActiveTab] = useState('first');

    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
    };

    return (
        <div>
            <Navbar />
            <div className="container min-vh-100 bg-secondary">
                {/* Tabs */}
                <Tab.Container defaultActiveKey="first" onSelect={handleTabSelect}>
                    <Nav variant="pills" style={minHieghtTab}>
                        <Nav.Item>
                            <Nav.Link eventKey="first" className='h-100 d-flex justify-content-center align-items-center text-dark' style={{ backgroundColor: activeTab === 'first' ? 'white' : 'red' }} >กิจกรรมที่ยังไม่เสร็จ</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second" className='h-100 d-flex justify-content-center align-items-center text-dark' style={{ backgroundColor: activeTab === 'second' ? 'white' : 'red' }}>กิจกรรมที่เสร็จสิ้นแล้ว</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content className='bg-white d-flex justify-content-center align-items-center w-100'>
                        <Tab.Pane eventKey="first" className='w-100'>

                            <Content mode="notFinish" />

                        </Tab.Pane>
                        <Tab.Pane eventKey="second" className='w-100'>
                            <Content mode="Finish" />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    );
}

export default MainScreen;