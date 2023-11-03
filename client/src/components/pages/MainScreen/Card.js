import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Import API
import { deleteUserTaskById, updateUserTaskById } from "../../../services/UserTaskService"

// Import Library
import jwtDecode from "jwt-decode"

function Card(props) {
    // useNavigate
    const navigate = useNavigate();

    // for modal Delete
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showSuccessDeleteModal, setshowSuccessDeleteModal] = useState(false);
    const [showModalStatusSuccess, setShowModalStatusSuccess] = useState(false);

    async function handleChangeDelete() {
        const token = localStorage.getItem('token')
        if (token) {
            const username = jwtDecode(token).username
            try {
                const responseDelete = await deleteUserTaskById(username, data.task_id)
                console.log(responseDelete)
                console.log("Delete")
                setShowModalDelete(false)
                setshowSuccessDeleteModal(true)
                // Refresh page
                // window.location.reload();
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
    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = () => setShowModalDelete(true);

    // for modal status
    const [showModalStatus, setShowModalStatus] = useState(false);

    async function handleChangeStatus() {
        const token = localStorage.getItem('token')
        if (token) {
            const username = jwtDecode(token).username
            try {
                const responseUpdate = await updateUserTaskById(username, data.task_id, 2) // 2 for finish
                console.log(responseUpdate)
                console.log("Change Status")
                setShowModalStatus(false)
                setShowModalStatusSuccess(true)
                // Refresh page
                // window.location.reload();
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
    const handleCloseModalStatus = () => setShowModalStatus(false);
    const handleShowModalStatus = () => setShowModalStatus(true);

    // setting mode
    const { mode, data , searchValue } = props;
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    const dateStringStart = data.task_startDay;
    const dateStart = new Date(dateStringStart);
    const formattedDateStart = dateStart.toLocaleDateString('th-TH', options);

    const dateStringEnd = data.task_endDay;
    const dateEnd = new Date(dateStringEnd);
    const formattedDateEnd = dateEnd.toLocaleDateString('th-TH', options);
    const isMatching = data.task_name.includes(searchValue);
    return (
        <>{isMatching || searchValue === '' ?
            <div className="card mb-3">
                <div className="card-body">
                    {/* Topic 1 */}
                    <div className="row">
                        <div className="col-12 my-1 d-flex flex-column justify-conten-center align-items-center">
                            <h5 className="card-title my-0">{data.task_name}</h5>
                        </div>
                        {mode === "notFinish" ? <div className="col-12 my-1 d-flex flex-column justify-conten-center align-items-center">
                            <button type="button" className="btn btn-primary" onClick={handleShowModalStatus}>เปลี่ยนสถานะ</button>
                        </div> : <></>}
                    </div>

                    {/* Topic 2 */}
                    <div className="row mt-2">
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <p className="my-0">วันที่เริ่ม</p>
                            <p className="my-0">{formattedDateStart}</p>
                        </div>
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <p className="my-0">เวลาที่เริ่ม </p>
                            <p className="my-0">{data.task_startHour}</p>
                        </div>
                    </div>

                    {/* Topic 3 */}
                    <div className="row mt-2">

                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <p className="my-0">วันที่จบ</p>
                            <p className="my-0">{formattedDateEnd}</p>
                        </div>
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <p className="my-0">เวลาที่จบ</p>
                            <p className="my-0">{data.task_endHour}</p>
                        </div>
                    </div>

                    {/* Topic 4 */}
                    <div className="row mt-2">
                        {mode === "Finish" ? <div className="col-12 my-1 d-flex justify-content-center align-items-center">
                            <h6 className="my-0 badge rounded-pill bg-info px-3 py-2">เสร็จสิ้นแล้ว</h6>
                        </div> : <></>}
                        {mode === "Fail" ? <div className="col-12 my-1 d-flex justify-content-center align-items-center">
                            <h6 className="my-0 badge rounded-pill bg-primary px-3 py-2">ล้มเหลว</h6>
                        </div> : <></>}
                        
                        <div className="col-12 my-1 d-flex justify-content-evenly align-items-center">
                            {mode === "Finish" || mode === "notFinish" ?
                            <Link to={`/updatetask/${data.userTask_id}`}><button type="button" className="btn btn-warning">UPDATE</button>
                            </Link> : <></>}
                            {mode === "Fail" ?
                            <button type="button" className="btn btn-secondary">UPDATE</button>
                             : <></>}
                            <button type="button" className="btn btn-danger" onClick={handleShowModalDelete}>DELETE</button>
                        </div> 
                    </div>

                </div>
            </div> : <></>}

            {/* Modal เปลี่ยนสถานะ */}
            <Modal show={showModalStatus} onHide={handleCloseModalStatus}>
                <Modal.Header closeButton>
                    <Modal.Title>คุณต้องการเปลี่ยนสถานะ {data.task_name} หรือไม่ ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>ยืนยันที่จะเปลี่ยนสถานะเป็นเสร็จสิ้นแล้วหรือไม่</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalStatus}>
                        ยกเลิก
                    </Button>
                    <Button variant="primary" onClick={handleChangeStatus}>
                        ยืนยัน
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal ลบกิจกรรม */}
            <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>คุณต้องการลบกิจกรรม {data.task_name} หรือไม่ ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>ยืนยันที่จะลบกิจกรรมนี้หรือไม่</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalDelete}>
                        ปิด
                    </Button>
                    <Button variant="danger" onClick={handleChangeDelete}>
                        ลบกิจกรรม
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal ลบกิจกรรมสำเร็จ */}
            <Modal
                    show={showSuccessDeleteModal}
                    onHide={() => setshowSuccessDeleteModal(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>ทำการลบกิจกรรม {data.task_name} แล้ว</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      กิจกรรมของคุณได้ถูกลบเรียบร้อยแล้ว
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setshowSuccessDeleteModal(false);
                          window.location.reload(true); // รีเฟรชหน้า
                        }}
                      >
                        ตกลง
                      </Button>
                    </Modal.Footer>
            </Modal>

            {/* Modal เปลี่ยนสถานะสำเร็จ */}
            <Modal
                    show={showModalStatusSuccess}
                    onHide={() => setShowModalStatusSuccess(false)}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>ทำการเปลี่ยนสถานะกิจกรรม {data.task_name} แล้ว</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      กิจกรรมของคุณได้ถูกเปลี่ยนสถานะเรียบร้อยแล้ว
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setShowModalStatusSuccess(false);
                          window.location.reload(true); // รีเฟรชหน้า
                        }}
                      >
                        ตกลง
                      </Button>
                    </Modal.Footer>
            </Modal>
        </>
    );
}

export default Card