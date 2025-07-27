import React, { useState } from "react";
import { CalciteButton } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/calcite/calcite.css";
import LayerDropdown from "../LayerDropdown/layerDropdown";
import ModelDropdown from "../ModelDropdown/modelDropdown";

const HamburgerMenu = ({ setTitle, setNumBoundingBoxes, open, setOpen }) => {

    return (
        <div>

            {/* Sliding Menu */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: open ? 0 : "-270px",
                    width: "250px",
                    height: "100%",
                    backgroundColor: "#fff",
                    boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    transition: "left 0.3s ease",
                    zIndex: 1000
                }}
            >
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100% " }}>
                    <div style={{ fontSize: "20px" }}>
                        Agro Optimizer
                    </div>
                </div>

                <div style={{ marginTop: "25px" }} />
                <ModelDropdown />

                <div style={{ marginTop: "15px" }} />
                <LayerDropdown handleSelect={setTitle} />
                <div style={{ marginTop: "15px" }}>

                </div>
                <CalciteButton
                    width="full"
                    iconStart="plus"
                    appearance="outline-fill"
                    onClick={() => setNumBoundingBoxes(prev => prev + 1)}
                >
                    Add Bounding Box
                </CalciteButton>


                {/* Spacer pushes the final button to the bottom */}
                <div style={{ flexGrow: 1 }} />

                <CalciteButton width="full" appearance="fill">
                    Analyze Feature Data
                </CalciteButton>
                <div style={{ paddingBottom: "30px" }}>

                </div>
            </div>

        </div>
    );
};

export default HamburgerMenu;
