import {
  STATION_1,
  STATION_2,
  STATION_4,
  STATION_5,
  STATION_8,
  STATION_15,
  STATION_16,
  STATION_17,
  STATION_18
} from "./Constants";
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        // Station 1 Central West Bay
        coordinates: STATION_1
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        //Station 2 East Bay
        coordinates: STATION_2
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        //Station 4 Central Bay
        coordinates: STATION_4
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        //Station 5 Northern West
        coordinates: STATION_5
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        //Station 8 South Bay
        coordinates: STATION_8
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        //Staion 15 West Bay
        coordinates: STATION_15
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        //station 16 West Bay
        coordinates: STATION_16
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        //station 17
        coordinates: STATION_17
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        //station 18
        coordinates: STATION_18
      }
    }
  ]
};

export default geojson;
