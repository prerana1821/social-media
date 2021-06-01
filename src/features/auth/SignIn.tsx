import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "./authSlice";
import SignInImg from "./../../images/signin.png";
import "./SignIn.css";
import { Footer, Header } from "../../components";

export const SignIn = () => {
  const auth = useAppSelector(selectAuth);

  const [signUpCredentials, setSignUpCredentials] = useState({
    email: "",
    firstName: "",
    lastName: "",
    birthdate: "",
    username: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    msg: "",
  });

  const signUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <div className='auth-form'>
        <div>
          <img src={SignInImg} alt='SignIn' className='auth-img' />
        </div>
        <div className='login-form'>
          <h1>Welcome!</h1>
          <form
            className='flex flex-col items-center'
            onSubmit={(e) => signUpHandler(e)}
          >
            <div className='login-div'>
              <div className='login-input'>
                <input
                  type='text'
                  className='input-txt-error'
                  required
                  value={signUpCredentials.firstName}
                  onChange={(e) =>
                    setSignUpCredentials(() => ({
                      ...signUpCredentials,
                      msg: "",
                      firstName: e.target.value,
                    }))
                  }
                />
                <span className='flt-label flt-label-form tri-pink'>
                  <i className='fas fa-user-circle'></i> First Name
                </span>
              </div>

              <div className='login-input'>
                <input
                  type='text'
                  className='input-txt-error'
                  required
                  value={signUpCredentials.lastName}
                  onChange={(e) =>
                    setSignUpCredentials(() => ({
                      ...signUpCredentials,
                      msg: "",
                      lastName: e.target.value,
                    }))
                  }
                />
                <span className='flt-label flt-label-form tri-pink'>
                  <i className='fas fa-user-circle'></i> Last Name
                </span>
              </div>
            </div>

            <div className='login-div'>
              <div className='login-input'>
                <input
                  type='email'
                  className='input-txt-error'
                  required
                  value={signUpCredentials.email}
                  onChange={(e) =>
                    setSignUpCredentials(() => ({
                      ...signUpCredentials,
                      msg: "",
                      email: e.target.value,
                    }))
                  }
                />
                <span className='flt-label flt-label-form tri-pink'>
                  <i className='fas fa-envelope'></i> Email
                </span>
              </div>

              <div className='login-input'>
                <input
                  type='text'
                  className='input-txt-error'
                  required
                  value={signUpCredentials.username}
                  onChange={(e) =>
                    setSignUpCredentials(() => ({
                      ...signUpCredentials,
                      msg: "",
                      username: e.target.value,
                    }))
                  }
                />
                <span className='flt-label flt-label-form tri-pink'>
                  <i className='fas fa-user'></i> Username
                </span>
              </div>
            </div>

            <div className='login-div'>
              <div className='login-input'>
                <input
                  className='input-txt-error'
                  required
                  type={signUpCredentials.showPassword ? "text" : "password"}
                  value={signUpCredentials.password}
                  onChange={(e) =>
                    setSignUpCredentials(() => ({
                      ...signUpCredentials,
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
                    setSignUpCredentials(() => ({
                      ...signUpCredentials,
                      showPassword: !signUpCredentials.showPassword,
                    }))
                  }
                >
                  {signUpCredentials.showPassword ? (
                    <i className='far fa-lg fa-eye-slash'></i>
                  ) : (
                    <i className='far fa-lg  fa-eye'></i>
                  )}
                </button>
              </div>

              <div className='login-input'>
                <input
                  className='input-txt-error'
                  required
                  type={
                    signUpCredentials.showConfirmPassword ? "text" : "password"
                  }
                  value={signUpCredentials.confirmPassword}
                  onChange={(e) =>
                    setSignUpCredentials(() => ({
                      ...signUpCredentials,
                      msg: "",
                      confirmPassword: e.target.value,
                    }))
                  }
                />
                <span className='flt-label flt-label-form tri-pink'>
                  <i className='fas fa-lock'></i> Confirm Password
                </span>
                <button
                  className='show-pass'
                  onClick={() =>
                    setSignUpCredentials(() => ({
                      ...signUpCredentials,
                      showConfirmPassword:
                        !signUpCredentials.showConfirmPassword,
                    }))
                  }
                >
                  {signUpCredentials.showConfirmPassword ? (
                    <i className='far fa-lg fa-eye-slash'></i>
                  ) : (
                    <i className='far fa-lg  fa-eye'></i>
                  )}
                </button>
              </div>
            </div>

            <div>
              <input
                type='date'
                className='input-txt-error birthdate'
                placeholder='Birthdate'
              />
            </div>

            <p>{signUpCredentials.msg}</p>

            <p className='mg'>
              Already have an account?
              <Link to='/login'>
                <span className='pink-txt'> Login!</span>
              </Link>
            </p>

            <button className='btn btn-main' type='submit'>
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
