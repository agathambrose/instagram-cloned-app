import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === " " || emailAddress === " ";

  const handleLogin = () => {};

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-full">
      <div className="flex w-3/5 hidden md:block">
        <img src="/images/iphone-with-profile.jpg" alt="login img" />
      </div>
      <div className="flex flex-col md:w-2/5 mx-auto w-8/12 justify-center items-center">
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
            aria-label="Email Address"
            placeholder="Email Address"
            type="text"
            className="text-sm text-gray-base w-full px-8 py-3 md:py-5 md:mr-3 
            md:px-6 md:h-2 rounded-md border border-gray-primary mb-2"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
