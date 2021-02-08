import React from "react";
import {
  GoogleMap,
  LoadScript,
  Circle,
  Marker,
  InfoBox,
} from "@react-google-maps/api";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: "600px",
  height: "300px",
  margin: "1em 2em",
};

const center = { lat: 43.74, lng: -79.373 };

function RinkMap(props) {
  const {
    allRinks,
    setAllRinks,
    selectedRink,
    setSelectedRink,
    distance,
  } = props;

  React.useEffect(() => console.log(allRinks), [allRinks]);

  const handleMarkerClick = (ind) => {
    setSelectedRink(ind);
    console.log(ind);
  };
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
        <Circle center={center} radius={distance} />
        {allRinks &&
          allRinks.rinks != null &&
          allRinks.rinks.map(
            (rink) =>
              rink.location != null && (
                <div key={rink.id}>
                  <Marker
                    position={{
                      lat: rink.location[0],
                      lng: rink.location[1],
                    }}
                    onClick={(e) => handleMarkerClick(rink.id)}
                  />
                  {selectedRink === rink.id && (
                    <InfoBox
                      position={{
                        lat: rink.location[0] + 0.03,
                        lng: rink.location[1] - 0.03,
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          opacity: 0.75,
                        }}
                      >
                        <div style={{ fontSize: `12px` }}>{rink.name}</div>
                      </div>
                    </InfoBox>
                  )}
                  */
                </div>
              )
          )}
        ;
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(RinkMap);
