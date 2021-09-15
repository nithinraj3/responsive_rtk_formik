import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useFormikContext } from "formik";
import { useState } from "react";

const CheckboxField = () => {
  const { setFieldValue, values } = useFormikContext();
  const [checkBoxAddress, setCheckBoxAddress] = useState(false);
  const checkBoxAddressChange = (e) => {
    setCheckBoxAddress(!checkBoxAddress);
    const presentAddress = values.present_address;
    setFieldValue("permanent_address", presentAddress);
  };
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={checkBoxAddress}
            onChange={checkBoxAddressChange}
            name="checked"
            color="primary"
          />
        }
        label="Same as present Address"
      />
    </>
  );
};

export default CheckboxField;
