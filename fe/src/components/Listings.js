import styled from "styled-components";
import LocationDropdown from "./LocationDropdown";
import ListingsTable from "./ListingsTable";

const Container = styled.div`
  width: 40%;
  height: 100vh;
  background-color: #e7e7e7;
  text-align: left;
`;

const LocationText = styled.h2`
  display: inline-block;
  position: relative;
  left: 20px;
`;

const Listings = () => {
  return (
    <Container>
      <LocationText>Location</LocationText>
      <LocationDropdown />
      <ListingsTable />
    </Container>
  );
};

export default Listings;
