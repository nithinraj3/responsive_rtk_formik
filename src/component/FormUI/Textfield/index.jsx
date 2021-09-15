import React from "react";
import { TextField } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const TextfieldWrapper = ({ name, isChecked, ...otherProps }) => {
  const { values } = useFormikContext();

  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };

  if (isChecked) {
    configTextfield.value = values.present_address;
  }

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;
