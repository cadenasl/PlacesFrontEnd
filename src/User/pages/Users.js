import UserList from "../components/UserList";
import { useEffect, useState } from "react";
import ErrorModal from "../../Shared/components/UI Element/ErrorModal";
import LoadingSpinner from "../../Shared/components/UI Element/LoadingSpinner";
import useHttps from "../../Shared/useHooks/useHttps";
import React from "react";

const Users = () => {
  const [users, setUsers] = useState();
  const { request, error, isLoading, clearErrorHandler } = useHttps();
  useEffect(() => {
    const obtainUsers = async () => {
      try {
        const response = await request(
          `${process.env.REACT_APP_BACKEND_URL_API_REST}/users`
        );

        setUsers(response.allUsers);
      } catch (err) {}
    };
    obtainUsers();
  }, [request]);

  return (
    <React.Fragment>
      {error && <ErrorModal error={error} onClear={clearErrorHandler} />}
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && users && <UserList items={users} />}
    </React.Fragment>
  );
};

export default Users;
