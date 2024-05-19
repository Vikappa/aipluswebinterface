/* eslint-disable react/prop-types */

const ResumeTonica = function(props){

    
    return(<tr>
        <td></td>
        <td>{props.tonica.name} ({props.tonica.brand})</td>
        <td>{props.tonica.totalQuantity}</td>
        <td>{(props.tonica.totalQuantity)*30}</td>
        <td>ml</td>
        <td>{props.tonica.flavour}</td>
    </tr>)
}

export default ResumeTonica