import Card from "./Card";

function Column(props) {
    const { textNumber, bgColor, mode, data, dataLength } = props

    // Making Fake Data
    const cards = []

    data.forEach(item => {
        cards.push(<Card key={item.userTask_id} mode={mode} data={item} />);
    });

    return (
        <div className='col-xs-12 col-sm-6 col-md-3 h-100 d-flex flex-column justify-content-center align-items-center'>
            <div className="card text-white h-100 w-100">
                <div className={`card-header text-center ${bgColor} fs-4`}>ประเภท {textNumber}</div>
                {dataLength !== 0 ?
                    (<div className="card-body bg-secondary overflow-auto">{cards}</div>) :
                    (<div className="card-body bg-secondary h-100 d-flex justify-content-center align-items-center">
                        <div className="card">
                            <div className="card-body">
                                [... ยังไม่พบงาน ...]
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>);
}

export default Column