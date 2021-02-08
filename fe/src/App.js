import "./App.css";
import styled from "styled-components";
import { Listings, Map, Filters } from "./components";
import React, { useState } from "react";

const HeaderBar = styled.div`
  background: #28b3bc;
  color: white;
  font-size: 12px;
  height: 50px;
  margin: 0;
`;

const Title = styled.h1`
  position: absolute;
  left: 20px;
  top: 10px;
  margin: 0;
  display: inline-block;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function createDataFromJsonList(jsonList) {
  return (
    !jsonList ||
    jsonList.map((booking) => {
      const output = {};
      output.date = booking.date;
      output.start = booking.startTime;
      output.end = booking.endTime;
      output.spots = booking.available;
      return output;
    })
  );
}

function App() {
  const [locationList, setLocationList] = React.useState([]);
  const [bookings, setBookings] = React.useState({ loading: false, data: [] });
  const [selectedId, setSelectedId] = React.useState(null);
  const [listingsUrl, setListingsUrl] = React.useState(
    "http://localhost:5000/LoadBookings?id=557"
  );

  const setLocations = (locations) => {
    setLocationList(locations);
  };

  const setSelectedLocation = (locationId) => {
    console.log("setting" + locationId);
    setSelectedId(locationId);
    setListingsUrl(`http://localhost:5000/LoadBookings?id=${locationId}`);
  };

  React.useEffect(() => {
    const getData = async () => {
      setBookings({ loading: true, data: [] });
      const data = await fetch(listingsUrl).then((response) => response.json());
      console.log(data);
      setBookings({ loading: false, data: createDataFromJsonList(data) });
    };
    getData();
  }, [listingsUrl, setSelectedId]);

  return (
    <div className="App">
      <HeaderBar>
        <Title>Rink Riffler</Title>
      </HeaderBar>
      <RowContainer>
        <Listings
          locationList={locationList}
          setSelectedLocation={setSelectedLocation}
          bookings={bookings}
        />
        <ColumnContainer>
          <Map setLocations={setLocations} />
          <Filters />
        </ColumnContainer>
      </RowContainer>
    </div>
  );
}

export default App;
