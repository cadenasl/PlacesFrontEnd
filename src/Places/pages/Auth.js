import Input from "../../Shared/components/FormElements/input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/utils/validator";
import useForm from "../../Shared/useHooks/useForm";
import Card from "../../Shared/components/UI Element/Card";
import Button from "../../Shared/components/FormElements/Button";
import classes from "./Auth.module.css";
import React, { useState, useContext } from "react";
import authContext from "../../Shared/context/context";
import LoadingSpinner from "../../Shared/components/UI Element/LoadingSpinner";
import ErrorModal from "../../Shared/components/UI Element/ErrorModal";
import useHttps from "../../Shared/useHooks/useHttps";
import ImageUploader from "../../Shared/components/FormElements/imageUploader";

const Auth = () => {
  const [isShowLoggedIn, setIsShowLoggedIn] = useState(true);
  const { error, isLoading, request, clearErrorHandler } = useHttps();
  const Ctx = useContext(authContext);

  const [reducerState, InputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(reducerState.inputs);

    if (isShowLoggedIn) {
      try {
        const responseData = await request(
          `${process.env.REACT_APP_BACKEND_URL_API_REST}/users/login`,
          "POST",
          { "Content-Type": "application/json" },
          JSON.stringify({
            email: reducerState.inputs.email.value,
            password: reducerState.inputs.password.value,
          })
        );

        console.log(responseData.userId);
        Ctx.isLoggedIn(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("name", reducerState.inputs.name.value);
        formData.append("image", reducerState.inputs.image.value);
        formData.append("password", reducerState.inputs.password.value);
        formData.append("email", reducerState.inputs.email.value);

        const responseData = await request(
          `${process.env.REACT_APP_BACKEND_URL_API_REST}/users/signup`,
          "POST",
          {},
          formData
        );
        console.log(responseData.token);
        Ctx.isLoggedIn(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };
  const onSwitchHandler = () => {
    if (!isShowLoggedIn) {
      setFormData(
        { ...reducerState.inputs, name: undefined, image: undefined },

        reducerState.inputs.email.isValid &&
          reducerState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...reducerState.inputs,
          name: { value: "", isValid: false },
          image: { value: null, isValid: false },
        },
        false
      );
    }
    setIsShowLoggedIn((prevState) => !prevState);
    console.log(isShowLoggedIn);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearErrorHandler} />
      <Card className={classes["authentication"]}>
        {isLoading && <LoadingSpinner asOverlay />}
        {isShowLoggedIn ? <h1>Login Required</h1> : <h1>Sign Up Please</h1>}
        <hr />
        <form onSubmit={onSubmitHandler} className={classes["auth-form"]}>
          {!isShowLoggedIn && (
            <React.Fragment>
              <Input
                id="name"
                element="input"
                type="text"
                label="name"
                validation={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a Name"
                onInput={InputHandler}
              />
              <ImageUploader
                center
                id="image"
                errorText="please provide an image"
                onInput={InputHandler}
              />{" "}
            </React.Fragment>
          )}
          <Input
            id="email"
            element="input"
            type="text"
            label="email"
            validation={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            errorText="Please enter a valid Email"
            onInput={InputHandler}
          />

          <Input
            id="password"
            element="input"
            type="text"
            label="password"
            validation={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid Password"
            onInput={InputHandler}
          />
          <Button disabled={!reducerState.isValid}>Sign in</Button>
        </form>
        <Button onClick={onSwitchHandler}>
          Switch to {isShowLoggedIn ? "Signup" : "Sign In"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
