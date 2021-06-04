import { NavigateFunction, Route, Routes, useNavigate } from "react-router";
import { SignIn, Login, Explore } from "./features";
import { Home } from "./pages/Home/Home";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "./app/hooks";
import {
  logout,
  userCredentialsDataDeleted,
  userCredentialsDataLoaded,
} from "./features/auth/authSlice";

export const setupAuthExceptionHandler = (
  // logout: ({
  //   navigate,
  //   dispatch,
  //   userCredentialsDataDeleted,
  // }: LogoutParameters) => void,
  logout: any,
  navigate: NavigateFunction,
  dispatch: any,
  userCredentialsDataDeleted: () => void
): void => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("come");
      if (error?.response?.status === UNAUTHORIZED) {
        logout({ navigate, dispatch, userCredentialsDataDeleted });
        console.log("here");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
};

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      const userFromLocalStorageObj = JSON.parse(userFromLocalStorage);
      dispatch(userCredentialsDataLoaded(userFromLocalStorageObj));
    }
    console.log("Hello");
    // setupAuthExceptionHandler(
    //   logout({ navigate, dispatch, userCredentialsDataDeleted }),
    //   navigate,
    //   dispatch,
    //   userCredentialsDataDeleted
    // );
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/explore' element={<Explore />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
