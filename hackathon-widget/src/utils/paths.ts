import Extent from "@arcgis/core/geometry/Extent";

export const layers = {
    "Precipitation Data 2025": "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/Precipitation/FeatureServer",
    "NVDI Data 2025": "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/NDVI/FeatureServer",
    "Solar Data 2025": "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/Solar_rad/FeatureServer",
    "Temperature Data 2025": "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/Temp/FeatureServer",
}

export const extent = new Extent({
    xmin: -10671265.9236,
    ymin: 5298259.1248,
    xmax: -10643701.0962,
    ymax: 5351333.878,
    spatialReference: { wkid: 102100 }
});