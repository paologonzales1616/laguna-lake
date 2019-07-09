import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 14.367071317719422,
    longitude: 121.23386808788138,
    zoom: 10.2,
    width: "100%",
    height: "100%"
  });

  return (
    <>
      <div className="col-9 px-0">
        <div className="map-wrapper">
          <ReactMapGL
            mapStyle="mapbox://styles/mapbox/outdoors-v11"
            mapboxApiAccessToken="pk.eyJ1IjoicGFkbzY5IiwiYSI6ImNqc2xiMHMxcjJqZmQ0M3M3bDhpM21tbW8ifQ.ucrihizFRCj9M70JR7hmDg"
            onViewportChange={viewport => setViewport(viewport)}
            {...viewport}
            style={{
              height: "100%",
              width: "100%"
            }}
          />
        </div>
        <style jsx>{`
          .col-9 {
            height: 100%;
          }
          .map-wrapper {
            position: fixed;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    </>
  );
};

export default Map;
