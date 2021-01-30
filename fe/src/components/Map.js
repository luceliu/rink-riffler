import styled from "styled-components";
import BasicSlider from "rc-slider";
import "rc-slider/assets/index.css";
import RinkMap from "./RinkMap";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Slider = styled(BasicSlider)`
  margin: 20px;
  width: 400px;
`;

const Map = () => {
  return (
    <FlexContainer>
      <Slider />
      <RinkMap />
    </FlexContainer>
  );
};

export default Map;
