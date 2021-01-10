import "./App.css";
import styled from "styled-components";
import { Listings, Map } from "./components";

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

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

function App() {
  return (
    <div className="App">
      <HeaderBar>
        <Title>Rink Riffler</Title>
      </HeaderBar>
      <FlexContainer>
        <Listings />
        <Map />
      </FlexContainer>
    </div>
  );
}

export default App;
