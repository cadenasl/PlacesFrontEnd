import { useParams } from "react-router-dom";
import Input from "../../Shared/components/FormElements/input.js";
import Button from "../../Shared/components/FormElements/Button.js";
import classes from "./UpdatePlace.module.css";
import { useForm } from "../../Shared/useHooks/useForm";
import Card from "../../Shared/components/UI Element/Card";
import useHttps from "../../Shared/useHooks/useHttps";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/utils/validator.js";
import React, { useEffect, useState, useContext } from "react";
import ErrorModal from "../../Shared/components/UI Element/ErrorModal";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../Shared/components/UI Element/LoadingSpinner";
import AuthContext from "../../Shared/context/context";

const UpdatePlace = () => {
  const [loadedPlace, setLoadedPlace] = useState();
  const { request, error, clearErrorHandler, isLoading } = useHttps();
  const history = useHistory();
  const Ctx = useContext(AuthContext);
  const placeId = useParams().pid;
  console.log(placeId);

  const [reducerState, InputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
    },
    true
  );
  let placeBeingUpdated;
  useEffect(() => {
    const obtainPlacebyId = async () => {
      try {
        placeBeingUpdated = await request(
          `${process.env.REACT_APP_BACKEND_URL_API_REST}/places/${placeId}`
        );

        console.log(placeBeingUpdated.place);

        setFormData(
          {
            title: {
              value: placeBeingUpdated.place.title,
              isValid: true,
            },
            description: {
              value: placeBeingUpdated.place.description,
              isValid: true,
            },
          },
          true
        );
        setLoadedPlace(placeBeingUpdated.place);
      } catch (err) {}
    };

    obtainPlacebyId();
  }, [request, setFormData, placeId, placeBeingUpdated]);

  // useEffect(() => {
  //   if (placeBeingUpdated.place) {

  //     setFormData(
  //       {
  //         title: {
  //           value: placeBeingUpdated.place.title,
  //           isValid: true,
  //         },
  //         description: {
  //           value: placeBeingUpdated.place.description,
  //           isValid: true,
  //         },
  //       },
  //       true
  //     );
  //   }

  // }, [setFormData, placeBeingUpdated]);

  const submitFormHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await request(
        `${process.env.REACT_APP_BACKEND_URL_API_REST}/places/${placeId}`,
        "PATCH",
        {
          "Content-Type": "application/json",
          authorization: "Bearer " + Ctx.token,
        },
        JSON.stringify({
          title: reducerState.inputs.title.value,
          description: reducerState.inputs.description.value,
        })
      );
      history.push("/" + Ctx.userId + "/places");
    } catch (err) {}
    console.log(reducerState.inputs);
  };

  if (!loadedPlace) {
    return (
      <div className="center">
        <Card>
          <LoadingSpinner asOverlay />
        </Card>
      </div>
    );
  }

  console.log(reducerState.isValid);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearErrorHandler} />

      {loadedPlace && !isLoading && (
        <form
          onSubmit={submitFormHandler}
          className={classes["update-place-form"]}
        >
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validation={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            intialValue={loadedPlace.title}
            intialIsValid={true}
            onInput={InputHandler}
          />
          <Input
            id="description"
            element="input"
            type="text"
            label="description"
            validation={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid description"
            intialValue={loadedPlace.description}
            intialIsValid={true}
            onInput={InputHandler}
          />

          <Button disabled={!reducerState.isValid}>Update place</Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
