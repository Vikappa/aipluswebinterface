/* eslint-disable react/prop-types */
import { useEffect } from "react";

const ResumeRowProdotto = function(props){

    const prodotto = props.item;


    
    return(
        <li>
        {
            prodotto.discriminatorString + " " + prodotto.name
        }
        </li>
    )
}

export default ResumeRowProdotto;