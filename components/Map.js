import React, { useState } from "react";
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";
import mapInfo from "./MapInfo";
import { TEXT_PROPS, RIVER_COORDINATES } from "../configs/Constants";
import geojson from "../configs/Geojson";

const Mapbox = ReactMapboxGl({
  minZoom: 10.2,
  maxZoom: 16,
  accessToken:
    "pk.eyJ1IjoicGFkbzY5IiwiYSI6ImNqc2xiMHMxcjJqZmQ0M3M3bDhpM21tbW8ifQ.ucrihizFRCj9M70JR7hmDg"
});
const bounds = [
  [120.6768888294888, 14.081271873141716], // Southwest coordinates
  [121.85197381492884, 14.63991902621649] // Northeast coordinates
];

const Map = props => {
  return (
    <Mapbox
      center={[121.23386808788138, 14.367071317719422]}
      zoom={[10.2]}
      style="mapbox://styles/mapbox/outdoors-v11"
      maxBounds={bounds}
      onClick={(map, evt) =>
        console.log(`[${evt.lngLat.lng}, ${evt.lngLat.lat}],`)
      }
      containerStyle={{
        height: "100%",
        width: "100%"
      }}
    >
      {/* {props.stationCondition && (
        <>
          {props.stationCondition.map((data, index) => (
            <Layer key={index} type="fill" paint={{ "fill-color": data.color }}>
              <Feature coordinates={mapInfo[index].polygon_coords} />
            </Layer>
          ))}
        </>
      )} */}
      <GeoJSONLayer
        data={geojson}
        linePaint={{
          "line-color": "black",
          "line-width": 1
        }}
      />
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

      {RIVER_COORDINATES.map((data, index) => (
        <Layer
          key={index}
          type="symbol"
          layout={{
            ...TEXT_PROPS,
            "text-field": data.river
          }}
        >
          <Feature coordinates={data.location} />
        </Layer>
      ))}
    </Mapbox>
  );
};

export default Map;
