import './widget.css';
import '@esri/calcite-components/dist/calcite/calcite.css';
import { FeatureTables } from '../components/FeatureTables';
import AppContextProvider from "../contexts/AppContext";
import { WebMapView } from '../components/MapView';
import { type AllWidgetProps } from "jimu-core";
import React, { useState } from 'react';
import { CalciteShell } from '@esri/calcite-components-react';
import Selection from '../components/Selection/selection';
import MapWidgets from '../components/MapWidgets/mapWidgets';
import Geometry from "@arcgis/core/geometry/Geometry";
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import { CalciteButton } from "@esri/calcite-components-react";
import HamburgerMenu from '../components/HamburgerMenu/hamburgerMenu';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

const Widget = (props: AllWidgetProps<unknown>): JSX.Element => {

    const [geometry, setGeometry] = useState<Geometry | null>(null);
    const [featureLayers, setFeatureLayers] = useState<string[]>([]);
    const [geometries, setGeometries] = useState<Geometry[]>([]);
    const [title, setTitle] = useState<string>("");
    const [numBoundingBoxes, setNumBoundingBoxes] = useState<number>(0);
    const [open, setOpen] = useState(true);


    const handleSubmit = () => {
        console.log("CLICKED");
    }


    return (
        <div className="widget" style={{ width: "100%", height: "100%" }}>
            <HamburgerMenu setTitle={setTitle} setNumBoundingBoxes={setNumBoundingBoxes} open={open} setOpen={setOpen} />
            <div style={{ marginLeft: open ? "270px" : "100px", display: "flex", justifyContent: "space-around", height: "100%", flexDirection: "column" }}>
                    <MapWidgets geometry={geometry} title={title} setFeatureLayers={setFeatureLayers}/>

                    <Selection featureLayers={featureLayers} setFeatureLayers={setFeatureLayers} geometries={geometries} setGeometries={setGeometries} setGeometry={setGeometry} numBoundingBoxes={numBoundingBoxes} />

            </div>


        </div>

    );
}

export default Widget;
