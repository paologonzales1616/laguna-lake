import React, { useState, useEffect } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import mapInfo from "./MapInfo";
import fetch from "isomorphic-unfetch";
import { TEXT_PROPS } from "../configs/Constants";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicGFkbzY5IiwiYSI6ImNqc2xiMHMxcjJqZmQ0M3M3bDhpM21tbW8ifQ.ucrihizFRCj9M70JR7hmDg"
});

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const Map = props => {
  const [feature, setFeature] = useState(props.feature);
  const [stationCondition, setstationCondition] = useState([]);

  const forecast = async () => {
    const d = new Date();
    const n = d.getMonth();

    const options = {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        month: parseInt(n) + 1,
        feature: feature
      })
    };
    try {
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `${window.location.protocol}//${
              document.location.hostname
            }/api/forecast`
          : `http://localhost:3000/api/forecast`,
        options
      );
      const data = await response.json();
      console.log(data);
      setstationCondition(
        data.sort((a, b) => {
          return a.station - b.station;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   forecast();
  // }, []);

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
      {stationCondition && (
        <>
          {stationCondition.map((data, index) => (
            <Layer
              key={index}
              type="fill"
              paint={{ "fill-color": data.color, "fill-opacity": 0.4 }}
            >
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
    </Mapbox>
  );
};

export default Map;
