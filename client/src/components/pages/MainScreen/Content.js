import Column from './Column';
import './Content.css';

const hieghtContent = {
    height: '95vh'
}

function Content(props) {
    const { mode, data } = props
    // console.log(data)

    // Data for each Column
    const type_1 = []
    const type_2 = []
    const type_3 = []
    const type_4 = []

    if (mode === "notFinish") {
        // notFinish
        for (let i = 0; i < data.length; i++) {
            const item = data[i]
            const category_id = item.category_id
            if (category_id === 1) {
                type_1.push(item)
            }
            else if (category_id === 2) {
                type_2.push(item)
            }
            else if (category_id === 3) {
                type_3.push(item)
            }
            else if (category_id === 4) {
                type_4.push(item)
            }
        }
    }
    else {
        // Finish
        for (let i = 0; i < data.length; i++) {
            const item = data[i]
            const category_id = item.category_id
            if (category_id === 1) {
                type_1.push(item)
            }
            else if (category_id === 2) {
                type_2.push(item)
            }
            else if (category_id === 3) {
                type_3.push(item)
            }
            else if (category_id === 4) {
                type_4.push(item)
            }
        }
    }
    return (
        <div className='container-fluid' style={hieghtContent}>

            <div className='row h-100'>

                <Column textNumber="งาน" bgColor="bg-primary" mode={mode} data={type_1} dataLength={type_1.length}/>

                <Column textNumber="ครอบครัว" bgColor="bg-info" mode={mode} data={type_2} dataLength={type_2.length}/>

                <Column textNumber="โรงพยาบาล" bgColor="bg-warning" mode={mode} data={type_3} dataLength={type_3.length}/>

                <Column textNumber="อื่นๆ" bgColor="bg-danger" mode={mode} data={type_4} dataLength={type_4.length}/>


            </div>

        </div>);
}
export default Content