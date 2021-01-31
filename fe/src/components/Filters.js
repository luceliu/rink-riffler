import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import DaysCheckboxes from "./DaysCheckboxes";

const Container = styled.div`
  background-color: rgba(40, 179, 188, 0.15);
  margin: 1em 2em;
`;

const Filters = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit button was clicked");
  };

  return (
    <Container>
      <p>Form goes here</p>
      <DaysCheckboxes />

      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Min No. of Spots"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Filters;
