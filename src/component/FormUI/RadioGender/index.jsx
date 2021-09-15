import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useField, useFormikContext } from "formik";
const RadioForm = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };

  const configRadio = {
    ...field,
    ...otherProps,
    onChange: handleChange,
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup {...configRadio}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>

      {meta.error && (
        <FormHelperText style={{ color: "red", marginLeft: "10px" }}>
          Please select a gender
        </FormHelperText>
      )}
    </div>
  );
};

export default RadioForm;
