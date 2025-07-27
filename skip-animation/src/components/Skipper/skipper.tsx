import React, { useEffect } from "react"

const Skipper = ({ ms, buttonText }) => {

    setTimeout(() => {
        const buttons = Array.from(document.getElementsByClassName("widget-button-link"));
        const targetButton = buttons.find(btn => btn.innerText.includes(buttonText)); // or use data-* attribute
        targetButton?.click();
    }, ms)

    return (
        <div className="skipper">

        </div>
    )
}

export default Skipper