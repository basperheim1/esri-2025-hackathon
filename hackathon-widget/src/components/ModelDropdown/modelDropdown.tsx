import "@esri/calcite-components/dist/calcite/calcite.css";
import {
    CalciteButton,
    CalciteDropdown,
    CalciteDropdownGroup,
    CalciteDropdownItem
} from "@esri/calcite-components-react";
import React, { useState } from "react";
import { appActions } from 'jimu-core';

const model_types = ["corn", "wheat", "barley", "potatoe", "avocado", "almond", "agave"]
const ModelDropdown = () => {
    const [selectedTitle, setSelectedTitle] = useState(null);

    const handleClick = (crop) => {
        setSelectedTitle(crop);
        console.log("Selected:", crop);
    };

    return (
        <CalciteDropdown>
            <CalciteButton
                width="full"
                slot="trigger"
                appearance="outline-fill"
            >
                {selectedTitle ? `Model Type: ${selectedTitle}` : "Add Model Type"}
            </CalciteButton>

            <CalciteDropdownGroup groupTitle="Crops">
                {model_types.map((crop, index) => (
                    <CalciteDropdownItem
                        key={crop}
                        selected={selectedTitle === crop}
                        onClick={() => handleClick(crop)}
                    >
                        {crop}
                    </CalciteDropdownItem>
                ))}
            </CalciteDropdownGroup>
        </CalciteDropdown>
    );
};

export default ModelDropdown;
