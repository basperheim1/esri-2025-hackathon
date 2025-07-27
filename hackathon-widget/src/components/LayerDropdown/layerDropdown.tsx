import "@esri/calcite-components/dist/calcite/calcite.css";
import {
    CalciteButton,
    CalciteDropdown,
    CalciteDropdownGroup,
    CalciteDropdownItem
} from "@esri/calcite-components-react";
import React from "react";
import { layers } from "../../utils/paths";


const LayerDropdown = ({ handleSelect }) => {

    console.log("GETTING HERE")


    return (
        <CalciteDropdown >
            <CalciteButton width="full" slot="trigger" iconStart="plus" appearance="outline-fill">
                Add Feature Layer
            </CalciteButton>
            <CalciteDropdownGroup groupTitle="Feature Layers">
                {
                    Object.entries(layers).map(([title, url]) => (
                        <CalciteDropdownItem key={title} onClick={() => {handleSelect(title); console.log(title)}}>
                            {title}
                        </CalciteDropdownItem>
                    )
                    )
                }

            </CalciteDropdownGroup>
        </CalciteDropdown>
    )
}

export default LayerDropdown;