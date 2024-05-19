/* eslint-disable react/prop-types */
import { useEffect } from "react"

const ResumeExtra = function(props){

    return(
        <tr>
        <td></td>
        <td>{props.extra.name}</td>
        <td></td>
        <td>{props.extra.totalQuantity}</td>
        <td>{props.extra.um}</td>
        <td>{props.extra.flavour}</td>
        </tr>
    )
}

export default ResumeExtra