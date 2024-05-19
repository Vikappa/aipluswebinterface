/* eslint-disable react/prop-types */
import { useEffect } from "react"

const ResumeGarnish = function (props){

    

    return(
        <tr>
            <td></td>
            <td>{props.garnish.name}</td>
            <td></td>
            <td>{props.garnish.totalQuantity}</td>
            <td>{props.garnish.um}</td>
            <td>{props.garnish.flavour},{props.garnish.color}</td>
        </tr>
    )
}

export default ResumeGarnish