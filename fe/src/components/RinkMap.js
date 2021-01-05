import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: "500px",
  height: "500px",
  margin: "2em",
};

const center = { lat: 43.74, lng: -79.373 };

function RinkMap() {
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(RinkMap);
