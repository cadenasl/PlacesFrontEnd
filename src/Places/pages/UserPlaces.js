import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useHttps from "../../Shared/useHooks/useHttps";
import { useState } from "react";
import React from "react";
import ErrorModal from "../../Shared/components/UI Element/ErrorModal";
import LoadingSpinner from "../../Shared/components/UI Element/LoadingSpinner";

const UserPlaces = () => {
  const { error, isLoading, request, clearErrorHandler } = useHttps();
  const [userPlaces, setUserPlaces] = useState();
  const userId = useParams().userId;

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await request(
          `${process.env.REACT_APP_BACKEND_URL_API_REST}/places/users/${userId}`
        );
        setUserPlaces(response.places);
      } catch (err) {}
    };
    fetch();
  }, [request]);

  const onDeleteUpdateHandler = (placeId) => {
    console.log(userId);
    setUserPlaces((preV) =>
      preV.filter((place) => {
        return place.id !== placeId;
      })
    );
    console.log(userPlaces);
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearErrorHandler} />
      {!isLoading && userPlaces && (
        <PlaceList items={userPlaces} onDelete={onDeleteUpdateHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
