import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { Footer, Header } from "../../components";
import LoginImg from "./../../images/login.svg";
import { login } from "./authSlice";

export const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
    showPassword: false,
    msg: "",
  });

  const dispatch = useAppDispatch();

  const loginHandler = () => {
    if (loginCredentials.username && loginCredentials.password) {
      dispatch(
        login({
          username: loginCredentials.username,
          password: loginCredentials.password,
        })
      );
    } else {
      setLoginCredentials({
        ...loginCredentials,
        msg: "Username is required & Password is required",
      });
    }
  };

  return (
    <>
      <Header />
      <div className='auth-form'>
        <img src={LoginImg} alt='login' className='auth-img' />
        <div className='login-form'>
          <h2 className='text-3xl font-bold'>Login</h2>
          <div className='login-input'>
            <input
              type='text'
              className='input-txt-error'
              required
              value={loginCredentials.username}
              onChange={(e) =>
                setLoginCredentials(() => ({
                  ...loginCredentials,
                  msg: "",
                  username: e.target.value,
                }))
              }
            />
            <span className='flt-label flt-label-form tri-pink'>
              <i className='fas fa-user'></i> Username
            </span>
          </div>

          <div className='login-input'>
            <input
              className='input-txt-error'
              required
              type={loginCredentials.showPassword ? "text" : "password"}
              value={loginCredentials.password}
              onChange={(e) =>
                setLoginCredentials(() => ({
                  ...loginCredentials,
                  msg: "",
                  password: e.target.value,
                }))
              }
            />
            <span className='flt-label flt-label-form tri-pink'>
              <i className='fas fa-lock'></i> Password
            </span>
            <button
              className='show-pass'
              onClick={() =>
                setLoginCredentials(() => ({
                  ...loginCredentials,
                  showPassword: !loginCredentials.showPassword,
                }))
              }
            >
              {loginCredentials.showPassword ? (
                <i className='far fa-lg fa-eye-slash'></i>
              ) : (
                <i className='far fa-lg  fa-eye'></i>
              )}
            </button>
          </div>

          <p>{loginCredentials.msg}</p>
          <button className='btn btn-main' onClick={loginHandler}>
            Login
          </button>
          <p className='ptb-1'>
            Don't have an account?
            <Link to='/signin'>
              <span className='pink-txt'> Sign up!</span>
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
