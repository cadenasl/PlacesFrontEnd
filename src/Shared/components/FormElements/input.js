import { useEffect, useReducer } from "react";
import { validate } from "../../utils/validator";
import "./input.css";


const inputReducer = (state, action) => {
  switch (action.type) {
    case "Change":
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validation),
      };
    case "Touched":
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};
const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer,{ value: props.intialValue||"", isValid: props.intialIsValid||false, touched: false });
  const{value,isValid}=inputState
  console.log(value)
  const{id,onInput}=props
 
  useEffect(()=>{onInput(id,value,isValid)

},[value,isValid,id,onInput])

  const onChangeHandler = (event) => {
    
    dispatch({
      type: "Change",
      payload: event.target.value,
      validation: props.validation,
    });
  };
  const onBlurHandler = () => {
    dispatch({ type: "Touched" });
  };
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeHolder}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        value={inputState.value}
        
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.touched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}

      {!inputState.isValid && inputState.touched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
