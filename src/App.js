import { useEffect, useState, useCallback } from 'react';
import { Login, Register } from './pages/auth';
import MainLayout from './components/layouts/Main';
import Cabinetlayout from './components/layouts/Cabinet';
import Profile from './pages/profile';
import LoadingWrapper from './components/sheard/LoadingWrapper';
import { getDoc, doc } from 'firebase/firestore';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
// import Cabinet from './pages/cabinet';
import { ROUTE_CONSTANTS,FIRESTORE_PATH_NAMES } from './core/utils/constants';
import { auth, db } from './services/firbase';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from './context/authContext';
import './styles/global.css';


const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true)
  const [userProfileInfo, setUserProfileInfo] = useState({})

  const handleGetUsersData = useCallback(async(uid) => {
      const docRef = doc(db,FIRESTORE_PATH_NAMES.REGISTERED_USERS,uid)
    const response = await getDoc(docRef) 
    if (response.exists()) {
      setUserProfileInfo(response.data())
    }
  },[])


  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
     user?.uid && handleGetUsersData(user.uid)
 
      setLoading(false)
      setIsAuth(Boolean(user));
    });


  }, []);

 
    return (
      <AuthContext.Provider value={{isAuth, userProfileInfo, handleGetUsersData}}>
      <LoadingWrapper loading={loading}>
        <RouterProvider
          router={
              createBrowserRouter(
                createRoutesFromElements(
                  <Route path="/" element={<MainLayout />}>
                    <Route path={ROUTE_CONSTANTS.LOGIN} element={ isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Login setIsAuth={setIsAuth}/>}/>
                    <Route path={ROUTE_CONSTANTS.REGISTER} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Register />}/>
                    
                    
                    <Route
                    path={ROUTE_CONSTANTS.CABINET}
                    element={isAuth ? <Cabinetlayout/> : <Navigate to={ROUTE_CONSTANTS.LOGIN}/>}
                    >

                    <Route
                     path={ROUTE_CONSTANTS.PROFILE}
                     element={<Profile />}
                     />

                    </Route>
                  </Route>
                )
              )
          }
        />
      </LoadingWrapper>
      </AuthContext.Provider>
    )
};

export default App;


