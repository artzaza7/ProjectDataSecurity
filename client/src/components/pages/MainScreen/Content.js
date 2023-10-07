import Column from './Column';

const hieghtContent = {
    height: '95vh'
}

function Content(props) {
    const { mode } = props
    return (
        <div className='container-fluid' style={hieghtContent}>

            <div className='row h-100'>

                <Column textNumber="1" bgColor="bg-primary" mode={mode} />

                <Column textNumber="2" bgColor="bg-info" mode={mode} />

                <Column textNumber="3" bgColor="bg-warning" mode={mode} />

                <Column textNumber="4" bgColor="bg-danger" mode={mode} />


            </div>

        </div>);
}
export default Content