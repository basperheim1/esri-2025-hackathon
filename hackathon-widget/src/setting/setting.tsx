import { React, defaultMessages as jimuCoreDefaultMessages } from "jimu-core";
import { MapWidgetSelector } from "jimu-ui/advanced/setting-components";
import { type AllWidgetSettingProps } from "jimu-for-builder";
import {
  Label,
  Tooltip,
  defaultMessages as jimuUIDefaultMessages,
  Select,
  Option,
  Alert
} from "jimu-ui";
import {
  SettingSection,
  SettingRow,
} from "jimu-ui/advanced/setting-components";
import { InfoOutlined } from "jimu-icons/outlined/suggested/info";
import { useContext, useState } from "react";
import { JimuMapView, JimuMapViewComponent, MapViewManager } from 'jimu-arcgis'
import ImageryLayer from "esri/layers/ImageryLayer";
import { useEffect } from "react";
import defaultI18nMessages from './translations/default'
import { getStyle } from './lib/style'
import { elementType } from "prop-types";


// Typical settings file, essentially just allows you to change the map widget 
// that the trace network widget is associated with. 
const Setting = (props: AllWidgetSettingProps<unknown>): React.ReactElement => {

  const [imageryLayerUrlsAndTitles, setImageryLayerUrlsAndTitles] = useState<{ [imageryLayerURL: string]: string }>({});
  const [isTitlesLoaded, setIsTitlesLoaded] = useState<boolean>(false);
  const [selectedLayerTitle, setSelectedLayerTitle] = useState<string>("");
  const [jimuMapView, setJimuMapView] = useState<JimuMapView|null>(null);

  // Called when you change the map widget
  const onMapSelected = (useMapWidgetIds: string[]): void => {

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


  const onLayerSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const key = Object.keys(imageryLayerUrlsAndTitles).find(key => imageryLayerUrlsAndTitles[key] === e.target.value);
    setSelectedLayerTitle(e.target.value);

    props.onSettingChange({
      id: props.id,
      config: props.config.set('selectedLayerURL', key)
    });
  }

  const onActiveViewChange = (jmv: JimuMapView, previousActiveViewId: string) => {

    setJimuMapView(jmv);

    // When the map view changes there is no longer a selectedLayerURL
    props.onSettingChange({
      id: props.id,
      config: props.config.set('selectedLayerURL', ""),
    });


    if (jmv) {
      getImageryLayerIdsAndTitles(jmv)
      setIsTitlesLoaded(true);
    }
  }


  const getImageryLayerIdsAndTitles = (jmv: JimuMapView) => {
    let imageryLayerUrlsAndTitlesUpdate: { [imgLayerURL: string]: string } = {}
    for (const currentLayer of jmv.view.map.layers) {
      if (currentLayer.type === "imagery") {
        if (currentLayer.url && !(currentLayer.url in imageryLayerUrlsAndTitlesUpdate)) {
          imageryLayerUrlsAndTitlesUpdate[currentLayer.url] = getLayerTitle(currentLayer);
        }

      }
    }
    setImageryLayerUrlsAndTitles(imageryLayerUrlsAndTitlesUpdate);
  }

  const getLayerTitle = (layer: __esri.ImageryLayer): string => {
    if (layer.title) {
      return layer.title;
    }
    if (layer.hasOwnProperty("_wabProperties.originalLayerName")) {
      return (layer as any).name || layer.id;
    }
    let title = (layer as any).label || (layer as any).name || "";
    if ((layer as any).url) {
      var serviceName;
      var index = (layer as any).url.indexOf("/FeatureServer");
      if (index === -1) {
        index = (layer as any).url.indexOf("/ImageServer");
      }
      if (index === -1) {
        index = (layer as any).url.indexOf("/service");
      }
      if (index > -1) {
        serviceName = (layer as any).url.substring(0, index);
        serviceName = serviceName.substring(serviceName.lastIndexOf("/") + 1, serviceName.length);
        if (title) {
          title = serviceName + " - " + title;
        } else {
          title = serviceName;
        }
      }
    }
    return title || layer.id;
  };

  const getImageryLayerList = (): JSX.Element | null => {
    let MCSLayerTitleLabels: JSX.Element[] = [];
    for (const [key, value] of Object.entries(imageryLayerUrlsAndTitles)) {
      MCSLayerTitleLabels.push(
        <Option key={key} value={value}>
          {value}
        </Option>
      )

    }
    if (isTitlesLoaded && Object.keys(imageryLayerUrlsAndTitles).length > 0) {
      return (
        <div className='w-100 mb-3'>
          <Label className="d-block mb-1">Select an Imagery Layer</Label>
          <Select
            className="w-100"
            value={selectedLayerTitle}
            onChange={onLayerSelected}
          >
            {MCSLayerTitleLabels}
          </Select>
        </div>
      )
    }

    return null;
  };

  const displayImageryLayerList = () => {
    return (
      props.useMapWidgetIds?.length > 0 && (
        <div className='w-100 mb-3'>
          {Object.keys(imageryLayerUrlsAndTitles).length === 0 && isTitlesLoaded &&
            <SettingRow>
              <Alert
                className={'warningMsg'}
                open
                text={props.intl.formatMessage({
                  id: 'noMCSLayerWarning',
                  defaultMessage: defaultI18nMessages.noImageryLayerWarning
                })}
                type={'warning'}
              />
            </SettingRow>
          }
          {
            Object.keys(imageryLayerUrlsAndTitles).length > 0 &&
            getImageryLayerList()
          }
        </div>
      )
    )
  };

  // Map between string and another string, essentially just makes 
  // it easier for you to configure messages in the default.ts file 
  const nls = (id: string): string => {
    const messages = Object.assign(
      {},
      jimuCoreDefaultMessages,
      jimuUIDefaultMessages,
    );
    return messages[id];
  };

  return (
    <div css={getStyle(props.theme)}>

      <div className="widget-setting-explorecompose">
          <SettingSection title={nls("sourceLabel")}>
            <SettingRow>
              <div className='w-100 mb-3'>
                <Label className="d-block mb-1">Select a Map Widget</Label>
                <MapWidgetSelector
                  onSelect={onMapSelected}
                  useMapWidgetIds={props.useMapWidgetIds}
                />
              </div>
            </SettingRow>
            <JimuMapViewComponent
              useMapWidgetId={props.useMapWidgetIds?.[0]}
              onActiveViewChange={onActiveViewChange}
            />
            <SettingRow>
              {displayImageryLayerList()}
            </SettingRow>
          </SettingSection>

      </div>
    </div >
  );
}

export default Setting