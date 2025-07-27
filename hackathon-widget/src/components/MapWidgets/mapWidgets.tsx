import Map from "@arcgis/core/Map.js";
import React, { useState, useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView.js";
import ImageryLayer from "@arcgis/core/layers/ImageryLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import "./mapWidgets.css"
import { layers, extent } from "../../utils/paths";
import Extent from "@arcgis/core/geometry/Extent";

const MapWidgets = ({ geometry, title, setFeatureLayers }) => {

    const [mapViews, setMapViews] = useState<MapView[]>([]);
    const [mapIds, setMapIds] = useState<number[]>([]);
    const [mapTitles, setMapTitles] = useState<string[]>([]);
    const nextId = useRef(0);

    useEffect(() => {

        if (!geometry) return

        mapViews.forEach((view) => {
            view.graphics.removeAll();
            view.graphics.add({
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
        });
    }, [geometry])

    useEffect(() => {
        if (title !== "") {
            handleAddMap(title)
        }
    }, [title])

    const handleAddMap = (title: string) => {
        const id = nextId.current++;
        setMapIds(prev => [...prev, id]);
        setMapTitles(prev => [...prev, title]);

        setTimeout(() => {
            const container = document.getElementById(`map-container-${id}`) as HTMLDivElement;
            if (container) {
                const map = new Map({
                    basemap: "topo-vector"
                });

                const view = new MapView({
                    container,
                    map,
                    center: [-118.805, 34.027],
                    zoom: 13
                });

                const layer = new FeatureLayer({
                    url: layers[title]
                })

                view.when(() => {
                    view.goTo(extent).catch(console.error);
                });



                map.add(layer)

                setFeatureLayers(prev => [...prev, layers[title]])

                setMapViews(prev => [...prev, view]);
            }
        }, 0); // wait for DOM element to render
    };


    return (
        <div>
            <div className="map-widgets">
                {mapIds.map(id => (
                    <div className="card">
                        <div
                            key={id}
                            id={`map-container-${id}`}
                            className="map"
                        />
                        <div className="text-container">
                            <div className="title">
                                {mapTitles[id]}
                            </div>
                            <div className="date">
                                {new Date(Date.now() + 3 * 60000).toLocaleDateString()}
                            </div>

                        </div>


                    </div>

                ))}
            </div>

        </div>

    );

}

export default MapWidgets; 