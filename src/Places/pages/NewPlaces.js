import Input from "../../Shared/components/FormElements/input";
import classes from "./NewPlaces.module.css";
import { VALIDATOR_REQUIRE } from "../../Shared/utils/validator";
import useHttps from "../../Shared/useHooks/useHttps";

import Button from "../../Shared/components/FormElements/Button";
import { useForm } from "../../Shared/useHooks/useForm";
import { useContext } from "react";
import AuthContext from "../../Shared/context/context";
import ErrorModal from "../../Shared/components/UI Element/ErrorModal";
import LoadingSpinner from "../../Shared/components/UI Element/LoadingSpinner";
import { useHistory } from "react-router-dom";
import ImageUploader from "../../Shared/components/FormElements/imageUploader";
import React from "react";

// const intialState={inputs:{
//     title:{
//         value:'',
//         isValid:false
//     },
//     description:{
//         value:'',
//         isValid:false
//     }
// },
// overallformIsValid:true}
// const reducer=(state,action)=>{
//     switch(action.type){
//         case 'INPUT_CHANGE':
//             let formIsValid=true
//             for( const input in state.inputs){
//                 console.log(input)
//                 if(input===action.inputId){
//                     console.log(action.inputId)
//                     formIsValid=formIsValid&&action.isValid
//                 }
//                 else{ formIsValid=formIsValid&&state.inputs[input].isValid}
//             }
//             return{

//                 ...state,
//                 inputs:{
//                     ...state.inputs,
//                     [action.inputId]:{value:action.value,isValid:action.isValid}
//                 },
//                 overallformIsValid:formIsValid

//             }
//             default:
//                 return state
//     }
// }
const NewPlaces = () => {
  const [reducerState, InputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { error, isLoading, clearErrorHandler, request } = useHttps();

  const ctx = useContext(AuthContext);
  console.log(ctx.token);
  const history = useHistory();
  // const[reducerState,dispatch]=useReducer(reducer,intialState)

  // const InputHandler=useCallback((id,value,isValid)=>{
  //     dispatch({type:'INPUT_CHANGE',value:value,inputId:id,isValid:isValid})
  // },[])

  const inputSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", reducerState.inputs.title.value);
      formData.append("description", reducerState.inputs.description.value);
      formData.append("image", reducerState.inputs.image.value);
      formData.append("address", reducerState.inputs.address.value);
      formData.append("creator", ctx.userId);

      await request(
        `${process.env.REACT_APP_BACKEND_URL_API_REST}/places`,
        "POST",
        { authorization: "Bearer " + ctx.token },
        formData
      );
      history.push("/");
    } catch (err) {}
    console.log(reducerState.inputs);
  };

  console.log(reducerState.isValid);

  return (
    <React.Fragment>
      <ErrorModal onClear={clearErrorHandler} error={error} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form onSubmit={inputSubmitHandler} className={classes["place-form"]}>
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          errorText="Please put a valid title"
          validation={[VALIDATOR_REQUIRE()]}
          onInput={InputHandler}
        />
        <ImageUploader
          center
          id="image"
          errorText="please provide an image"
          onInput={InputHandler}
        />
        <Input
          id="description"
          type="textarea"
          label="description"
          element="textarea"
          errorText="Please put a valid description"
          validation={[VALIDATOR_REQUIRE()]}
          onInput={InputHandler}
        />

        <Input
          id="address"
          label="address"
          element="input"
          errorText="Please put a valid title"
          validation={[VALIDATOR_REQUIRE()]}
          onInput={InputHandler}
        />
        <Button disabled={!reducerState.isValid}>Submit</Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlaces;
