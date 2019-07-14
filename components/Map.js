import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicGFkbzY5IiwiYSI6ImNqc2xiMHMxcjJqZmQ0M3M3bDhpM21tbW8ifQ.ucrihizFRCj9M70JR7hmDg"
});

const Map = () => {
  return (
    <Mapbox
      center={[-0.481747846041145, 51.3233379650232]}
      style="mapbox://styles/mapbox/streets-v9"
      zoom={[10.2]}
      containerStyle={{
        height: "94vh",
        width: "100%"
      }}
    >
      <Layer type="symbol" layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
    </Mapbox>
  );
};

export default Map;
