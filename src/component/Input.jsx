import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import { validate } from "../shared/util/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isTouched: false,
    isValid: false,
  });

  const [watchPassword, setWatchPassword] = useState(false);

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const handlePassword = () => {
    setWatchPassword(!watchPassword);
  };

  const element =
    props.element === "input" ? (
      <TextField
        id={props.id}
        name={props.name}
        variant={props.variant}
        required
        fullWidth
        type={props.type}
        label={props.label}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        helperText={
          !inputState.isValid && inputState.isTouched && props.errorText
        }
        error={!inputState.isValid && inputState.isTouched ? true : false}
      />
    ) : (
      <TextField
        variant={props.variant}
        required
        fullWidth
        name={props.name}
        label={props.label}
        id={props.id}
        type={watchPassword ? "text" : "password"}
        value={inputState.value}
        onChange={changeHandler}
        onBlur={touchHandler}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handlePassword} edge="end">
                {watchPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        helperText={
          !inputState.isValid && inputState.isTouched && props.errorText
        }
        error={!inputState.isValid && inputState.isTouched ? true : false}
      />
    );

  return <>{element}</>;
};

export default Input;
