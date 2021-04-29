import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { AiFillFacebook } from "react-icons/ai";

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(showPassword ? false : true);
  };

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = () => {};

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className="container flex m-auto md:mx-auto max-w-screen-md items-center h-full font-roboto">
      <div className="flex w-4/5 hidden md:block">
        <img src="/images/iphone-with-profile.jpg" alt="login img" />
      </div>
      <div
        className="flex flex-col w-10/12 md:w-3/5 mx-auto 
      justify-center items-center "
      >
        <div className="flex flex-col bg-white-pure shadow-sm border border-gray-primary p-5 mt-5 md:mt-0">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/instagramlogo.png"
              alt="logo"
              className="mt-4 md:mt-2 w-8/12 md:w-6/12 mb-4"
            />
          </h1>
          {error && <p className="text-xs text-red-primary mb-4">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              placeholder="Email Address"
              type="text"
              className="text-sm placeholder-gray-primary w-full py-3 px-4 shadow-sm rounded border border-gray-primary mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
            />

            <div className="relative inline-block">
              <input
                aria-label="Enter your password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="text-sm placeholder-gray-primary w-full py-3 
            px-16 shadow-sm rounded border border-gray-primary mb-2"
                onChange={({ target }) => setPassword(target.value)}
              />
              <input
                type="button"
                value="Show"
                className="absolute block top-0 right-0 py-3 text-sm
            px-4 shadow-sm rounded border border-gray-primary outline-none cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>

            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white-pure w-full py-2 mt-3 rounded font-medium 
                      ${isInvalid && "opacity-50"}`}
            >
              Login
            </button>

            <div className="flex justify-center items-center relative text-gray-primary my-4 text-medium">
              <p>
                <span className="absolute bottom-2 -left-0">
                  _______________
                </span>
                OR
                <span className="absolute bottom-2 -right-0">
                  _______________
                </span>
              </p>
            </div>

            <div className="text-blue-dark flex justify-center font-medium items-center my-3">
              <AiFillFacebook className="text-2xl" />
              <p className="">Log in with Facebook</p>
            </div>

            <small className="flex justify-center items-center">
              Forgot password?
            </small>
          </form>
        </div>
        <div
          className="flex justify-center w-full bg-white-pure shadow-sm 
         border border-gray-primary p-5 mt-5 mb-3"
        >
          <p>
            Don't have an account?{" "}
            <span className="text-blue-medium font-medium">
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>

        <p className="flex justify-center items-center">Get the app.</p>

        <div className="flex items-center justify-center mt-3">
          <img
            src="/images/appstorelogo.png"
            alt="logo"
            className="w-2/5 mr-2"
          />
          <img src="/images/googleplaylogo.png" alt="logo" className="w-2/5" />
        </div>
      </div>
    </div>
  );
};

export default Login;
