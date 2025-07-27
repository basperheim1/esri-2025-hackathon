import React, { useState, useRef, useEffect } from "react";
import { CalciteButton } from "@esri/calcite-components-react";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import ImageryLayer from "@arcgis/core/layers/ImageryLayer";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import { Geometry } from "@arcgis/core/geometry";
import "./selection.css"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { extent } from "../../utils/paths";

const Selection = ({ geometries, setGeometries, featureLayers, setFeatureLayers, setGeometry, numBoundingBoxes }): JSX.Element => {
    const [sketch, setSketch] = useState<SketchViewModel | null>(null);
    const [showSketchMap, setShowSketchMap] = useState<boolean>(false);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        if (numBoundingBoxes !== 0) {
            handleClick()
        }
    }, [numBoundingBoxes])


    useEffect(() => {
        const container = document.getElementById(`map-cont-${geometries.length - 1}`) as HTMLDivElement;
        if (container) {
            const map = new Map({
                basemap: "topo-vector"
            });

            const mapView = new MapView({
                container,
                map,
                center: [-118.805, 34.027],
                zoom: 13
            });

            mapView.when(() => {
                mapView.goTo(extent);

            })


            const geometry = geometries[geometries.length - 1];


            // add bounding box 
            mapView.graphics.removeAll();
            mapView.graphics.add({
                geometry,
                symbol: {
                    type: "simple-fill",
                    color: [140, 140, 255, 0.4],
                    outline: {
                        color: [0, 0, 0],
                        width: 1
                    }
                }
            });

            for (const url of featureLayers) {
                const layer = new FeatureLayer({ url: url });
                map.add(layer);

            }


        }
    }, [geometries, featureLayers])

    useEffect(() => {
        if (showSketchMap && mapContainerRef.current) {
            const map = new Map({
                basemap: "topo-vector"
            });

            const mapView = new MapView({
                container: mapContainerRef.current,
                map,
                center: [-118.805, 34.027],
                zoom: 13
            });

            mapView.when(() => {
                mapView.goTo(extent);

            })


            // Add feature layers

            for (const url of featureLayers) {
                const layer = new FeatureLayer({ url: url });
                map.add(layer);
            }



            const sketchVM = new SketchViewModel({
                view: mapView,
                layer: mapView.graphics
            });

            setSketch(sketchVM);

            sketchVM.on("create", (evt) => {
                if (evt.state === "complete") {
                    setGeometries([...geometries, evt.graphic.geometry as Geometry]);
                    setShowSketchMap(false);
                }
            });

            sketchVM.create("polygon");
        }
    }, [showSketchMap]); // only runs when showSketchMap becomes true

    const handleClick = () => {
        setShowSketchMap(true); // will trigger useEffect
    };

    return (
        <div className="selection">

            {showSketchMap && (
                <div
                    className="bounding-box-map-popup"
                    ref={mapContainerRef}
                />

            )}


            <div className="bounding-boxes">
                {geometries.map((item, index) => (

                    <div className={`card ${index === selectedIndex ? "selected" : ""}`} onClick={() => {
                        setSelectedIndex(index);
                        setGeometry(geometries[index])
                    }}>
                        <div
                            key={index}
                            id={`map-cont-${index}`}
                            className={`map`}

                        />
                        <div className="text-container">
                            <div className="title">
                                Bounding Box #{index + 1}
                            </div>
                            <div className="date">
                                User Defined
                            </div>

                        </div>


                    </div>

                ))}
            </div>
        </div>
    );
};

export default Selection;
