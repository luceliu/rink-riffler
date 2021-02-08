import React from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { sizing } from "@material-ui/system";
import { withStyles } from "@material-ui/core/styles";
import RinkMap from "./RinkMap";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const DistanceSlider = withStyles({
  root: {
    color: "#52af77",
    width: "80%",
    margin: "2%",
  },
})(Slider);

const rinksApiUrl = "http://localhost:5000/LoadRinks";

const Map = (props) => {
  const defaultSelectedRink = 0; //Index of selected rink
  const [distance, setDistance] = React.useState(30); // Bounds to search for rinks within
  const { setLocations } = props;
  const rinke = [
    {
      name: "Rink #1",
      ind: 0,
    },
    {
      name: "Rink #2",
      ind: 1,
    },
    {
      name: "Rink #3",
      ind: 2,
    },
  ];
  const [allRinks, setAllRinks] = React.useState(
    {
      loading: false,
      rinks: rinke,
    },
    () => {
      console.log(allRinks.rinks);
    }
  );
  const [selectedRink, setSelectedRink] = React.useState(defaultSelectedRink);

  const handleSliderUpdate = (event, newDistance) => {
    console.log("SLIDER");
    setDistance(newDistance);
  };

  React.useEffect(() => {
    setAllRinks({ loading: true, rinks: null });
    const getResponse = async () => {
      const data = await fetch(rinksApiUrl).then((response) => response.json());
      console.log(data);
      setAllRinks({ loading: false, rinks: data });
      setLocations(data);
    };
    getResponse();
  }, [setAllRinks]);
  return (
    <FlexContainer>
      <DistanceSlider
        value={distance}
        onChange={handleSliderUpdate}
        aria-labelledby="Distance"
      />
      <RinkMap
        allRinks={allRinks}
        setAllRinks={setAllRinks}
        selectedRink={selectedRink}
        setSelectedRink={setSelectedRink}
        distance={distance * 300}
        key={allRinks}
      />
    </FlexContainer>
  );
};

export default Map;
