import Card from "./Card";
import './Column.css'

function Column(props) {
    const { textNumber, bgColor, mode, data, dataLength, searchValue } = props

    // Making Fake Data
    const cards = []

    data.forEach(item => {
        cards.push(<Card key={item.userTask_id} mode={mode} data={item} searchValue={searchValue}/>);
    });
    // console.log(data.task_name)
    // const isMatching = data.task_name.includes(searchValue);

    return (
        <div className='col-xs-12 col-sm-6 col-md-3 h-100 d-flex flex-column justify-content-center align-items-center custom-column'>
            <div className="card text-white h-100 w-100 noborder">
                <div className={`card-header text-center ${bgColor} fs-4`}>ประเภท {textNumber}</div>
                {dataLength !== 0 ?
                    (<div className="card-body custom-column overflow-auto">{cards}</div>) :
                    (<div className="card-body custom-column h-100 d-flex justify-content-center align-items-center">
                        <div className="card">
                            {/* {isMatching || searchValue === '' ? */}
                            <div className="card-body">
                                [... ยังไม่พบงาน ...]
                            </div>
                            {/* : <></>} */}
                        </div>
                    </div>)}
            </div>
        </div>);
}

export default Column