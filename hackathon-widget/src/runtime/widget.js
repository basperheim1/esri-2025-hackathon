import './widget.css';
import '@esri/calcite-components/dist/calcite/calcite.css';
import React from 'react';
import Selection from '../components/Selection/selection';
const Widget = (props) => {
    var _a;
    const imageryLayerUrl = (_a = props.config) === null || _a === void 0 ? void 0 : _a.selectedLayerURL;
    return (React.createElement("div", { className: "widget" },
        React.createElement(Selection, { props: props })));
};
export default Widget;
//# sourceMappingURL=widget.js.map