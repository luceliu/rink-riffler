import "./App.css";
import styled from "styled-components";
import { Listings, Map, Filters } from "./components";

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

function App() {
  return (
    <div className="App">
      <HeaderBar>
        <Title>Rink Riffler</Title>
      </HeaderBar>
      <RowContainer>
        <Listings />
        <ColumnContainer>
          <Map />
          <Filters />
        </ColumnContainer>
      </RowContainer>
    </div>
  );
}

export default App;
