/* eslint-disable react/prop-types */
import React from "react"

const ResumeGin = function (props) {
    

    return (
        <tr className="align-items-center">
            <td><img height={"40px"} width={"40px"} src={props.gin.ginImage} alt={props.gin.ginBrand} /></td>
            <td>{props.gin.name} ({props.gin.ginBrand})</td>
            <td>{props.gin.totalQuantity}</td>
            <td>{props.gin.totalVolume}</td>
            <td>{props.gin.um}</td>
            <td>{props.gin.flavour}</td>
        </tr>
    );
}

export default ResumeGin;
