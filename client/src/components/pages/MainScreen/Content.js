import Column from './Column';
import './Content.css';

const hieghtContent = {
    height: '95vh'
}

function Content(props) {
    const { mode, data , searchValue } = props
    // console.log(data)

    // Data for each Column
    const type_1 = []
    const type_2 = []
    const type_3 = []
    const type_4 = []
    let countData = [0,0,0,0];

    if (mode === "notFinish") {
        // notFinish
        for (let i = 0; i < data.length; i++) {
            const item = data[i]
            
            const category_id = item.category_id
            if (category_id === 1) {
                type_1.push(item)
                countData[0]+=1;
            }
            else if (category_id === 2) {
                type_2.push(item)
                countData[1]+=1;
            }
            else if (category_id === 3) {
                type_3.push(item)
                countData[2]+=1;
            }
            else if (category_id === 4) {
                type_4.push(item)
                countData[3]+=1;
            }
        }
    }
    else if(mode === "Finish"){
        // Finish
        for (let i = 0; i < data.length; i++) {
            const item = data[i]
            const category_id = item.category_id
            if (category_id === 1) {
                type_1.push(item)
                countData[0] += 1;
            }
            else if (category_id === 2) {
                type_2.push(item)
                countData[1] +=1;
            }
            else if (category_id === 3) {
                type_3.push(item)
                countData[2]+=1;
            }
            else if (category_id === 4) {
                type_4.push(item)
                countData[3]+=1;
            }
        }
    } 
    else {
        // Fail
        for (let i = 0; i < data.length; i++) {
            const item = data[i]
            const category_id = item.category_id
            if (category_id === 1) {
                type_1.push(item)
                countData[0]+=1;
            }
            else if (category_id === 2) {
                type_2.push(item)
                countData[1]+=1;
            }
            else if (category_id === 3) {
                type_3.push(item)
                countData[2]+=1;
            }
            else if (category_id === 4) {
                type_4.push(item)
                countData[3]+=1;
            }
        }
    }
    return (
        <div className='container-fluid' style={hieghtContent}>
            <div className='row h-100'>

                <Column textNumber={`งาน [${countData[0]}]`} bgColor="bg-primary" searchValue={searchValue} mode={mode} data={type_1} dataLength={type_1.length}/>

                <Column textNumber={`ครอบครัว [${countData[1]}]`} count2 bgColor="bg-info" searchValue={searchValue} mode={mode} data={type_2} dataLength={type_2.length}/>

                <Column textNumber={`โรงพยาบาล [${countData[2]}]`} count3 bgColor="bg-warning" searchValue={searchValue} mode={mode} data={type_3} dataLength={type_3.length}/>

                <Column textNumber={`อื่นๆ [${countData[3]}]`} count4 bgColor="bg-danger"searchValue={searchValue} mode={mode} data={type_4} dataLength={type_4.length}/>


            </div>

        </div>);
}
export default Content