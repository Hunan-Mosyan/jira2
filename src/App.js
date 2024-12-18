import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import LoadingWrapper from "./components/sheard/LoadingWrapper";
import { ROUTE_CONSTANTS } from "./core/utilis/constants";
import { Login, Register } from "./pages/auth";
import { useEffect } from "react";
import MainLayout from "./layouts/Main";
import Profile from "./pages/profile";
import CabinetLayout from "./layouts/Cabinet";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileInfo } from "./state-managment/slices/userProfile";
import Cabinet from "./pages/cabinet";

import "./styles/global.css";

const App = () => {
  const dispatch = useDispatch();
  const {
    loading,
    authUserInfo: { isAuth },
  } = useSelector((store) => store.userProfile);

  useEffect(() => {
    dispatch(fetchUserProfileInfo());
  }, []);

  return (
    <LoadingWrapper loading={loading}>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
              <Route
                path={ROUTE_CONSTANTS.LOGIN}
                element={
                  isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Login />
                }
              />
              <Route
                path={ROUTE_CONSTANTS.REGISTER}
                element={
                  isAuth ? (
                    <Navigate to={ROUTE_CONSTANTS.CABINET} />
                  ) : (
                    <Register />
                  )
                }
              />

              <Route
                path={ROUTE_CONSTANTS.CABINET}
                element={
                  isAuth ? (
                    <CabinetLayout />
                  ) : (
                    <Navigate to={ROUTE_CONSTANTS.LOGIN} />
                  )
                }
              >
                <Route path={ROUTE_CONSTANTS.PROFILE} element={<Profile />} />
                <Route index element={<Cabinet />}></Route>
              </Route>
            </Route>
          )
        )}
      />
    </LoadingWrapper>
  );
};
export default App;
