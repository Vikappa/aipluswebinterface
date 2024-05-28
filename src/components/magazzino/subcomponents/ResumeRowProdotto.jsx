/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

const ResumeRowProdotto = function (props) {
    const [isHovered, setIsHovered] = useState(false);
    const prodotto = props.item;

    useEffect(() => {
        console.log(prodotto);
    }, [prodotto]);

    const renderProductDescription = () => {
        switch (prodotto.discriminatorString) {
            case "GIN_BOTTLE":
                return `Bottiglia di Gin ${prodotto.brandId} - ${prodotto.name} (${prodotto.ginFlavourId})`;
            case "TONICA":
                return `Tonica ${prodotto.brand_tonica_name} - ${prodotto.name} (${prodotto.flavourId})`;
            case "ALIMENTO_EXTRA":
                return `Alimento ${prodotto.name}`;
            case "GUARNIZIONE":
                return `Guarnizione ${prodotto.name}`;
            default:
                return `Errore`;
        }
    };

    const renderQuantity = () => {
        switch (prodotto.discriminatorString) {
            case "ALIMENTO_EXTRA":
                return `${prodotto.qtaExtra}${prodotto.UM}`;
            case "GUARNIZIONE":
                return `${prodotto.quantitaGarnish}${prodotto.UM}`;
            default:
                return '';
        }
    };

    return (
        <li
            style={{
                ...styles.productItem,
                ...(isHovered ? styles.productItemHover : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span style={styles.description}>
                {renderProductDescription()}
            </span>
            <span style={styles.quantity}>
                {renderQuantity()}
            </span>
        </li>
    );
};

const styles = {
    productItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: "0.9rem",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        padding: "1px",
        borderBottom: "1px solid #ccc",
        listStyle: "none",
        transition: "background-color 0.3s",
        cursor: "pointer",
    },
    productItemHover: {
        backgroundColor: "#f9f9f9",
    },
    description: {
        flex: 1,
        textAlign: 'left',
    },
    quantity: {
        marginLeft: '10px',
        whiteSpace: 'nowrap',
    }
};

export default ResumeRowProdotto;
