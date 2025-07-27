// import React, { createContext, useReducer, useState } from 'react';
// import ArcGISMap from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import ImageryLayer from "@arcgis/core/layers/ImageryLayer";
// import Extent from "@arcgis/core/geometry/Extent";
// import FeatureTable from '@arcgis/core/widgets/FeatureTable';
// import { useEffect } from 'react';
// import { Immutable, DataSourceTypes, type IMSqlExpression, type DataSource /** FeatureLayerDataSourceConstructorOptions, DataSourceJson */ } from 'jimu-core'
// import { JimuMapView} from 'jimu-arcgis'
// enum OrderRule {
//   Ascending = "Ascending",
//   Descending = "Descending",
// }
// enum RuleType {
//   AttributeRule = "Attribute rule",
//   ManualRule = "Manual rule",
// }
// interface RowData {
//   name: string;
//   alias: string;
//   orderRule: OrderRule;
// }
// interface Context {
// 	webMap: ArcGISMap | null;
// 	mapView: MapView | null;
// 	mapExtent: Extent | null;
// 	mapContainer: HTMLDivElement | null;
// 	imageryLayer: ImageryLayer | null;
// 	attributeFilterExpression: string;
// 	filterToExtent: boolean;
// 	CSDatasetIDs: Set<number>;
// 	bisDatasetIdFieldName: string;
// 	showExploreBathymetryTab: boolean;
// 	imageServiceURL: string | null;
// 	sqlExpression: IMSqlExpression;
// 	rules: RowData[];
// 	imageryLayerDataSource: DataSource | null;
// 	jimuMapView: JimuMapView | null
// 	sortedBisDatasetIds: string[]
// 	// eslint-disable-next-line
// 	setWebMap: Function;
// 	// eslint-disable-next-line
// 	setMapView: Function;
// 	// eslint-disable-next-line
// 	setMapExtent: Function;
// 	// eslint-disable-next-line
// 	setMapContainer: Function;
// 	// eslint-disable-next-line
// 	setImageryLayer: Function;
// 	// eslint-disable-next-line
// 	setAttributeFilterExpression: Function;
// 	// eslint-disable-next-line
// 	setFilterToExtent: Function;
// 	// eslint-disable-next-line
// 	setCSDatasetIDs: Function;
// 	// eslint-disable-next-line
// 	setBisDatasetIdFieldName: Function;
// 	// eslint-disable-next-line
// 	setShowExploreBathymetryTab: Function;
// 	// eslint-disable-next-line
// 	setImageServiceURL: Function;
// 	setSqlExpression: Function;
// 	setRules: Function; 
// 	setImageryLayerDataSource: Function;
// 	setJimuMapView: Function; 
// 	setSortedBisDatasetIds: Function; 	
// }
// export const AppContext = createContext<Context>(
// 	{
// 		webMap: null,
// 		mapView: null,
// 		mapExtent: null,
// 		mapContainer: null,
// 		imageryLayer: null,
// 		attributeFilterExpression: "",
// 		filterToExtent: false,
// 		CSDatasetIDs: new Set(),
// 		bisDatasetIdFieldName: "",
// 		showExploreBathymetryTab: true,
// 		imageServiceURL: "",
// 		sqlExpression: "",
// 		rules: [],
// 		imageryLayerDataSource: null,
// 		jimuMapView: null,
// 		sortedBisDatasetIds: [],
// 		// eslint-disable-next-line
// 		setWebMap: () => { },
// 		// eslint-disable-next-line
// 		setMapView: () => { },
// 		// eslint-disable-next-line
// 		setMapExtent: () => { },
// 		// eslint-disable-next-line
// 		setMapContainer: () => { },
// 		// eslint-disable-next-line
// 		setImageryLayer: () => { },
// 		// eslint-disable-next-line
// 		setAttributeFilterExpression: () => { },
// 		// eslint-disable-next-line
// 		setFilterToExtent: () => { },
// 		// eslint-disable-next-line
// 		setCSDatasetIDs: () => { },
// 		// eslint-disable-next-line
// 		setBisDatasetIdFieldName: () => { },
// 		setShowExploreBathymetryTab: () => { },
// 		// eslint-disable-next-line
// 		setImageServiceURL: () => { },
// 		setSqlExpression: () => { },
// 		setRules: () => {},
// 		setImageryLayerDataSource: () => { },
// 		setJimuMapView: () =>{ },
// 		setSortedBisDatasetIds: () => {},
// 	} as Context,
// );
// const AppContextProvider = (props: any) => {
// 	const [webMap, setWebMap] = useState<ArcGISMap | null>(null);
// 	const [mapView, setMapView] = useState<MapView | null>(null);
// 	const [mapExtent, setMapExtent] = useState<Extent | null>(null);
// 	const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
// 	const [imageryLayer, setImageryLayer] = useState<ImageryLayer | null>(null);
// 	const [attributeFilterExpression, setAttributeFilterExpression] = useState<string>("");
// 	const [filterToExtent, setFilterToExtent] = useState<boolean>(false);
// 	const [CSDatasetIDs, setCSDatasetIDs] = useState<Set<number>>(new Set());
// 	const [bisDatasetIdFieldName, setBisDatasetIdFieldName] = useState<string>("");
// 	const [showExploreBathymetryTab, setShowExploreBathymetryTab] = useState<boolean>(true);
// 	const [imageServiceURL, setImageServiceURL] = useState<string>("");
// 	const [sqlExpression, setSqlExpression] = useState<IMSqlExpression>("");
// 	const [rules, setRules] = useState<RowData[]>([]);
// 	const [imageryLayerDataSource, setImageryLayerDataSource] = useState<DataSource>(null);
// 	const [jimuMapView, setJimuMapView] = useState<JimuMapView| null> (null);
// 	const [sortedBisDatasetIds, setSortedBisDatasetIds] = useState<string[]>([]);
// 	return <AppContext.Provider value={{
// 		webMap: webMap,
// 		mapView: mapView,
// 		mapExtent: mapExtent,
// 		mapContainer: mapContainer,
// 		imageryLayer: imageryLayer,
// 		attributeFilterExpression: attributeFilterExpression,
// 		filterToExtent: filterToExtent,
// 		CSDatasetIDs: CSDatasetIDs,
// 		bisDatasetIdFieldName: bisDatasetIdFieldName,
// 		showExploreBathymetryTab: showExploreBathymetryTab,
// 		imageServiceURL: imageServiceURL,
// 		sqlExpression: sqlExpression,
// 		rules: rules, 
// 		imageryLayerDataSource: imageryLayerDataSource,
// 		jimuMapView: jimuMapView,
// 		sortedBisDatasetIds: sortedBisDatasetIds,
// 		setWebMap: setWebMap,
// 		setMapView: setMapView,
// 		setMapExtent: setMapExtent,
// 		setMapContainer: setMapContainer,
// 		setImageryLayer: setImageryLayer,
// 		setAttributeFilterExpression: setAttributeFilterExpression,
// 		setFilterToExtent: setFilterToExtent,
// 		setCSDatasetIDs: setCSDatasetIDs,
// 		setBisDatasetIdFieldName: setBisDatasetIdFieldName,
// 		setShowExploreBathymetryTab: setShowExploreBathymetryTab,
// 		setImageServiceURL: setImageServiceURL,
// 		setSqlExpression: setSqlExpression,
// 		setRules: setRules,
// 		setImageryLayerDataSource: setImageryLayerDataSource,
// 		setJimuMapView: setJimuMapView,
// 		setSortedBisDatasetIds: setSortedBisDatasetIds
// 	}}>{props.children}</AppContext.Provider>;
// };
// export default AppContextProvider;
//# sourceMappingURL=AppContext.js.map