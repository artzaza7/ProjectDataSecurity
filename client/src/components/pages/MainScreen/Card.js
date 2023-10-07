function Card(props) {
    // setting mode
    const { mode } = props;
    return (
        <div className="card mb-3">
            <div className="card-body">
                {/* Topic 1 */}
                <div className="row">
                    <div className="col-12 my-1 d-flex flex-column justify-conten-center align-items-center">
                        <h5 className="card-title my-0">งานวันเกิดใครสักคน</h5>
                    </div>
                    {mode === "notFinish" ? <div className="col-12 my-1 d-flex flex-column justify-conten-center align-items-center">
                        <button type="button" className="btn btn-primary">เปลี่ยนสถานะ</button>
                    </div> : <></>}
                </div>

                {/* Topic 2 */}
                <div className="row mt-2">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <p className="my-0">วันที่เริ่ม</p>
                        <p className="my-0">10/10/2010</p>
                    </div>
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <p className="my-0">เวลาที่เริ่ม </p>
                        <p className="my-0">18:00 น.</p>
                    </div>
                </div>

                {/* Topic 3 */}
                <div className="row mt-2">

                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <p className="my-0">วันที่จบ</p>
                        <p className="my-0">10/10/2010</p>
                    </div>
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <p className="my-0">เวลาที่จบ</p>
                        <p className="my-0">21:00 น.</p>
                    </div>
                </div>

                {/* Topic 4 */}
                <div className="row mt-2">
                    {mode === "Finish" ? <div className="col-12 my-1 d-flex justify-content-center align-items-center">
                        <h6 className="my-0 badge rounded-pill bg-info px-3 py-2">เสร็จสิ้นแล้ว</h6>
                    </div> : <></>}
                    <div className="col-12 my-1 d-flex justify-content-evenly align-items-center">
                        <button type="button" className="btn btn-warning">UPDATE</button>
                        <button type="button" className="btn btn-danger">DELETE</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card