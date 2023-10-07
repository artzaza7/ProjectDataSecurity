import Card from "./Card";

function Column(props) {
    const { textNumber, bgColor, mode } = props

    // Making Fake Data
    const cards = []

    for (let i = 1; i <= 10; i++) {
        cards.push(<Card key={i} mode={mode}/>);
    }
    
    return (
        <div className='col-xs-12 col-sm-6 col-md-3 h-100 d-flex flex-column justify-content-center align-items-center'>
            <div className="card text-white h-100">
                <div className={`card-header text-center ${bgColor} fs-4`}>ประเภท {textNumber}</div>
                <div className="card-body bg-secondary overflow-auto">

                    {cards}

                </div>
            </div>
        </div>);
}

export default Column