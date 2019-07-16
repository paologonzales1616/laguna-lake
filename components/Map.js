import React from "react";
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";
import mapInfo from "./MapInfo";
import { TEXT_PROPS } from "../configs/Constants";
import geojson from "../configs/Geojson";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicGFkbzY5IiwiYSI6ImNqc2xiMHMxcjJqZmQ0M3M3bDhpM21tbW8ifQ.ucrihizFRCj9M70JR7hmDg"
});

const Map = props => {
  return (
    <Mapbox
      center={[121.23386808788138, 14.367071317719422]}
      zoom={[10.2]}
      style="mapbox://styles/mapbox/outdoors-v11"
      containerStyle={{
        height: "100%",
        width: "100%"
      }}
    >
          <GeoJSONLayer
        data={geojson}
        linePaint={{
          "line-color": "black",
          "line-width": 1
        }}
    />
      {props.stationCondition && (
        <>
          {props.stationCondition.map((data, index) => (
            <Layer key={index} type="fill" paint={{ "fill-color": data.color }}>
              <Feature coordinates={mapInfo[index].polygon_coords} />
            </Layer>
          ))}
        </>
      )}
      {mapInfo.map((data, index) => (
        <Layer
          key={index}
          type="symbol"
          layout={{
            ...TEXT_PROPS,
            "text-field": `Station ${data.station}`
          }}
        >
          <Feature coordinates={data.marker_coords} />
        </Layer>
      ))}
          <GeoJSONLayer
        data={geojson}
        linePaint={{
          "line-color": "black",
          "line-width": 1
        }}
    />
    </Mapbox>
  );
};

export default Map;
