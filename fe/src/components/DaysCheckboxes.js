import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const DaysCheckboxes = () => {
  const [state, setState] = React.useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.mon}
            onChange={handleChange}
            name="mon"
            color="primary"
          />
        }
        label="Mon"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.tue}
            onChange={handleChange}
            name="tue"
            color="primary"
          />
        }
        label="Tue"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={state.wed}
            onChange={handleChange}
            name="wed"
            color="primary"
          />
        }
        label="Wed"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.thu}
            onChange={handleChange}
            name="thu"
            color="primary"
          />
        }
        label="Thu"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.fri}
            onChange={handleChange}
            name="fri"
            color="primary"
          />
        }
        label="Fri"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.sat}
            onChange={handleChange}
            name="sat"
            color="primary"
          />
        }
        label="Sat"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.sun}
            onChange={handleChange}
            name="sun"
            color="primary"
          />
        }
        label="Sun"
      />
    </FormGroup>
  );
};

export default DaysCheckboxes;
