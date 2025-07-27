import {
    CalciteButton,
    CalciteDropdown,
    CalciteDropdownGroup,
    CalciteDropdownItem
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { appActions } from 'jimu-core';

const Dropdown = () => {
    const industries = ["agriculture", "retail", "shipping", "manufacturing", "forestry", "mining"]
    const [selectedTitle, setSelectedTitle] = useState(null);

    const handleClick = (industry) => {
        setSelectedTitle(industry);
        console.log("Selected:", industry);

        const buttons = Array.from(document.getElementsByClassName("widget-button-link"));
        const targetButton = buttons.find(btn => btn.innerText.includes("See More")); // or use data-* attribute
        targetButton?.click();
    };

    return (
        <div className="dropdown">
            <CalciteDropdown>
                <CalciteButton
                    width="full"
                    slot="trigger"
                    appearance="outline-fill"
                    iconStart="plus"
                    scale="l"
                >
                    Create New Project
                </CalciteButton>
                <CalciteDropdownGroup>
                    {industries.map((industry, index) => (
                        <CalciteDropdownItem
                            key={industry}
                            selected={selectedTitle === industry}
                            onClick={() => handleClick(industry)}
                        >
                            {industry}
                        </CalciteDropdownItem>
                    ))}
                </CalciteDropdownGroup>
            </CalciteDropdown>
        </div>
    )
}



export default Dropdown