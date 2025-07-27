import { React, defaultMessages as jimuCoreDefaultMessages } from "jimu-core";
import { MapWidgetSelector } from "jimu-ui/advanced/setting-components";
import { Label, defaultMessages as jimuUIDefaultMessages, Select, Option, Alert } from "jimu-ui";
import { SettingSection, SettingRow, } from "jimu-ui/advanced/setting-components";
import { useState } from "react";
import { JimuMapViewComponent } from 'jimu-arcgis';
import defaultI18nMessages from './translations/default';
import { getStyle } from './lib/style';
// Typical settings file, essentially just allows you to change the map widget 
// that the trace network widget is associated with. 
const Setting = (props) => {
    var _a;
    const [imageryLayerUrlsAndTitles, setImageryLayerUrlsAndTitles] = useState({});
    const [isTitlesLoaded, setIsTitlesLoaded] = useState(false);
    const [selectedLayerTitle, setSelectedLayerTitle] = useState("");
    const [jimuMapView, setJimuMapView] = useState(null);
    // Called when you change the map widget
    const onMapSelected = (useMapWidgetIds) => {
        props.onSettingChange({
            id: props.id,
            useMapWidgetIds: useMapWidgetIds,
        });
        if (useMapWidgetIds.length === 0) {
            setIsTitlesLoaded(false);
            setImageryLayerUrlsAndTitles({});
            setSelectedLayerTitle("");
            props.onSettingChange({
                id: props.id,
                config: props.config.set('selectedLayerURL', ""),
                useMapWidgetIds: useMapWidgetIds
            });
        }
    };
    const onLayerSelected = (e) => {
        const key = Object.keys(imageryLayerUrlsAndTitles).find(key => imageryLayerUrlsAndTitles[key] === e.target.value);
        setSelectedLayerTitle(e.target.value);
        props.onSettingChange({
            id: props.id,
            config: props.config.set('selectedLayerURL', key)
        });
    };
    const onActiveViewChange = (jmv, previousActiveViewId) => {
        setJimuMapView(jmv);
        // When the map view changes there is no longer a selectedLayerURL
        props.onSettingChange({
            id: props.id,
            config: props.config.set('selectedLayerURL', ""),
        });
        if (jmv) {
            getImageryLayerIdsAndTitles(jmv);
            setIsTitlesLoaded(true);
        }
    };
    const getImageryLayerIdsAndTitles = (jmv) => {
        let imageryLayerUrlsAndTitlesUpdate = {};
        for (const currentLayer of jmv.view.map.layers) {
            if (currentLayer.type === "imagery") {
                if (currentLayer.url && !(currentLayer.url in imageryLayerUrlsAndTitlesUpdate)) {
                    imageryLayerUrlsAndTitlesUpdate[currentLayer.url] = getLayerTitle(currentLayer);
                }
            }
        }
        setImageryLayerUrlsAndTitles(imageryLayerUrlsAndTitlesUpdate);
    };
    const getLayerTitle = (layer) => {
        if (layer.title) {
            return layer.title;
        }
        if (layer.hasOwnProperty("_wabProperties.originalLayerName")) {
            return layer.name || layer.id;
        }
        let title = layer.label || layer.name || "";
        if (layer.url) {
            var serviceName;
            var index = layer.url.indexOf("/FeatureServer");
            if (index === -1) {
                index = layer.url.indexOf("/ImageServer");
            }
            if (index === -1) {
                index = layer.url.indexOf("/service");
            }
            if (index > -1) {
                serviceName = layer.url.substring(0, index);
                serviceName = serviceName.substring(serviceName.lastIndexOf("/") + 1, serviceName.length);
                if (title) {
                    title = serviceName + " - " + title;
                }
                else {
                    title = serviceName;
                }
            }
        }
        return title || layer.id;
    };
    const getImageryLayerList = () => {
        let MCSLayerTitleLabels = [];
        for (const [key, value] of Object.entries(imageryLayerUrlsAndTitles)) {
            MCSLayerTitleLabels.push(React.createElement(Option, { key: key, value: value }, value));
        }
        if (isTitlesLoaded && Object.keys(imageryLayerUrlsAndTitles).length > 0) {
            return (React.createElement("div", { className: 'w-100 mb-3' },
                React.createElement(Label, { className: "d-block mb-1" }, "Select an Imagery Layer"),
                React.createElement(Select, { className: "w-100", value: selectedLayerTitle, onChange: onLayerSelected }, MCSLayerTitleLabels)));
        }
        return null;
    };
    const displayImageryLayerList = () => {
        var _a;
        return (((_a = props.useMapWidgetIds) === null || _a === void 0 ? void 0 : _a.length) > 0 && (React.createElement("div", { className: 'w-100 mb-3' },
            Object.keys(imageryLayerUrlsAndTitles).length === 0 && isTitlesLoaded &&
                React.createElement(SettingRow, null,
                    React.createElement(Alert, { className: 'warningMsg', open: true, text: props.intl.formatMessage({
                            id: 'noMCSLayerWarning',
                            defaultMessage: defaultI18nMessages.noImageryLayerWarning
                        }), type: 'warning' })),
            Object.keys(imageryLayerUrlsAndTitles).length > 0 &&
                getImageryLayerList())));
    };
    // Map between string and another string, essentially just makes 
    // it easier for you to configure messages in the default.ts file 
    const nls = (id) => {
        const messages = Object.assign({}, jimuCoreDefaultMessages, jimuUIDefaultMessages);
        return messages[id];
    };
    return (React.createElement("div", { css: getStyle(props.theme) },
        React.createElement("div", { className: "widget-setting-explorecompose" },
            React.createElement(SettingSection, { title: nls("sourceLabel") },
                React.createElement(SettingRow, null,
                    React.createElement("div", { className: 'w-100 mb-3' },
                        React.createElement(Label, { className: "d-block mb-1" }, "Select a Map Widget"),
                        React.createElement(MapWidgetSelector, { onSelect: onMapSelected, useMapWidgetIds: props.useMapWidgetIds }))),
                React.createElement(JimuMapViewComponent, { useMapWidgetId: (_a = props.useMapWidgetIds) === null || _a === void 0 ? void 0 : _a[0], onActiveViewChange: onActiveViewChange }),
                React.createElement(SettingRow, null, displayImageryLayerList())))));
};
export default Setting;
//# sourceMappingURL=setting.js.map