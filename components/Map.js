import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

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
        minHeight: "100%",
        width: "100%"
      }}
    >
      {props.children}
    </Mapbox>
  );
};

export default Map;
