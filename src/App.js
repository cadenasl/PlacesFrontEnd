import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoadingSpinner from "./Shared/components/UI Element/LoadingSpinner";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
// import Users from "./User/pages/Users";
// import NewPlace from "./Places/pages/NewPlaces";
import MainNavigation from "./Shared/components/Navigation/MainNavigation";
// import UserPlaces from "./Places/pages/UserPlaces";
// import UpdatePlace from "./Places/pages/UpdatePlace";
// import Auth from "./Places/pages/Auth";
import AuthContext from "./Shared/context/context";
import { useState, useCallback, useEffect } from "react";
import React from "react";
import { Suspense } from "react";

const Users = React.lazy(() => import("./User/pages/Users.js"));
const NewPlace = React.lazy(() => import("./Places/pages/NewPlaces"));

const UserPlaces = React.lazy(() => import("./Places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./Places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./Places/pages/Auth"));
let timeout;

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState();
  const [expirationTime, setExpirationTime] = useState();
  const isLoggedInHandler = useCallback((userId, token, expirationTime) => {
    setUserId(userId);
    console.log(token);
    setToken(token);
    const tokenExpirationTime =
      expirationTime || new Date(new Date().getTime() + 3600000);
    setExpirationTime(tokenExpirationTime);
    localStorage.setItem(
      "token",
      JSON.stringify({
        userId: userId,
        token: token,
        expirationTime: tokenExpirationTime.toISOString(),
      })
    );
  }, []);
  const isLoggedOutHandler = useCallback(() => {
    setToken(null);
    setUserId(null);
    setExpirationTime(null);
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    if (token && expirationTime) {
      const timeRemaining = expirationTime.getTime() - new Date().getTime();
      timeout = setTimeout(isLoggedOutHandler, timeRemaining);
    } else {
      clearTimeout(timeout);
    }
  }, [token, expirationTime, isLoggedOutHandler]);

  useEffect(() => {
    const localStorageToken = JSON.parse(localStorage.getItem("token"));

    if (
      localStorageToken &&
      localStorageToken.token &&
      new Date(localStorageToken.expirationTime) > new Date()
    ) {
      isLoggedInHandler(
        localStorageToken.userId,
        localStorageToken.token,
        new Date(localStorageToken.expirationTime)
      );
    }
  }, [isLoggedInHandler]);
  let routes;
  if (token) {
    routes = (
      <Suspense
        fallback={
          <div>
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/places">
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/places/:pid">
            <UpdatePlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  } else {
    routes = (
      <Suspense
        fallback={
          <div>
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/places">
            <UserPlaces />
          </Route>
          <Route path="/Authenticate">
            <Auth />
          </Route>
          <Redirect to="/Authenticate" />
        </Switch>
      </Suspense>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isAuth: !!token,
        userId: userId,
        token: token,
        isLoggedIn: isLoggedInHandler,
        isLoggedout: isLoggedOutHandler,
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
