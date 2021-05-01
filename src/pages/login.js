import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { AiFillFacebook } from "react-icons/ai";
import * as ROUTES from "../constants/routes";

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  //Start State Settings
  const [emailAddress, setEmailAddress] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";
  //End State Settings

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.FEED);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram";
  });

  return (
    <div className="container flex flex-col font-roboto">
      <div className="container flex m-auto md:mx-auto max-w-screen-md items-center h-full font-roboto">
        <div className="flex w-4/5 hidden md:block">
          <img src="/images/iphone-with-profile.jpg" alt="login img" />
        </div>
        <div
          className="flex flex-col w-10/12 md:w-3/5 mx-auto 
      justify-center items-center "
        >
          <div
            className={`flex flex-col w-full bg-white-pure shadow-sm border border-gray-primary p-5 mt-5 ${
              error ? "md:mt-5" : "md:mt-0"
            }`}
          >
            <h1 className="flex justify-center w-full">
              <img
                src="/images/instagramlogo.png"
                alt="logo"
                className="mt-4 md:mt-2 w-8/12 md:w-6/12 mb-4"
              />
            </h1>

            <form onSubmit={handleLogin} method="POST">
              <input
                aria-label="Enter your email address"
                placeholder="Email Address"
                type="text"
                className="text-sm placeholder-gray-primary w-full py-3 
                px-4 shadow-sm rounded border border-gray-primary mb-2
                outline-none"
                onChange={({ target }) => setEmailAddress(target.value)}
              />

              <div className="relative">
                <input
                  aria-label="Enter your password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="text-sm placeholder-gray-primary w-full py-3 
                  px-4 shadow-sm rounded border border-gray-primary mb-2
                  outline-none"
                  onChange={({ target }) => setPassword(target.value)}
                />
                <input
                  type="button"
                  value="Show"
                  className="absolute top-0 right-0 py-3 text-sm px-2 
                  shadow-sm rounded border border-gray-primary
                  outline-none cursor-pointer"
                  onClick={() => setShowPassword(showPassword ? false : true)}
                />
              </div>

              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium text-white-pure w-full py-2 mt-3 rounded font-medium focus:outline-none 
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

              <div className="text-blue-dark flex justify-center font-medium items-center my-3 outline-none">
                <AiFillFacebook className="text-2xl" />
                <p className="">Log in with Facebook</p>
              </div>

              <div className="flex justify-center items-center text-center">
                {error && (
                  <p className="text-sm text-red-primary mb-4">
                    Sorry, your login information was incorrect. Please
                    double-check.
                  </p>
                )}
              </div>

              <small className="flex justify-center items-center text-blue-dark">
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

          <p className="flex justify-center items-center p-4 text-sm">
            Get the app.
          </p>

          <div
            className={`flex items-center justify-center mt-3 ${
              error ? "mb-4" : "mb-2"
            }`}
          >
            <img
              src="/images/appstorelogo.png"
              alt="logo"
              className="w-2/5 mr-2"
            />
            <img
              src="/images/googleplaylogo.png"
              alt="logo"
              className="w-2/5"
            />
          </div>
        </div>
      </div>

      <footer className="flex flex-col justify-center items-center text-gray-soft my-4 text-sm mb-20">
        <div className="text-center w-4/5 md:w-3/6 my-4">
          <div>
            <small className="mr-2">About</small>{" "}
            <small className="mr-2">Blog</small>{" "}
            <small className="mr-2">Jobs</small>{" "}
            <small className="mr-2">Help</small>{" "}
            <small className="mr-2">API</small>{" "}
            <small className="mr-2">Privacy</small>{" "}
            <small className="mr-2">Terms</small>{" "}
            <small className="mr-2">Top</small>{" "}
            <small className="mr-2">Accounts</small>{" "}
            <small className="mr-2">Hashtags</small>{" "}
            <small className="mr-2">Locations</small>{" "}
          </div>
          <div>
            <small className="mr-2">Beauty</small>{" "}
            <small className="mr-2">Dance & Performance</small>{" "}
            <small className="mr-2">Fitness Food & Drink</small>{" "}
            <small className="mr-2">Home & Garden</small>{" "}
            <small className="mr-2">Music</small>{" "}
            <small className="mr-2">Visual Arts</small>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <small>
            <select
              name="languages"
              id="languages"
              className="outline-none bg-white-fade"
            >
              <option value="AF">Afrikaans</option>
              <option value="SQ">Albanian</option>
              <option value="AR">Arabic</option>
              <option value="HY">Armenian</option>
              <option value="EU">Basque</option>
              <option value="BN">Bengali</option>
              <option value="BG">Bulgarian</option>
              <option value="CA">Catalan</option>
              <option value="KM">Cambodian</option>
              <option value="ZH">Mandarin</option>
              <option value="HR">Croatian</option>
              <option value="CS">Czech</option>
              <option value="DA">Danish</option>
              <option value="NL">Dutch</option>
              <option value="EN" selected>
                English
              </option>
              <option value="ET">Estonian</option>
              <option value="FJ">Fiji</option>
              <option value="FI">Finnish</option>
              <option value="FR">French</option>
              <option value="KA">Georgian</option>
              <option value="DE">German</option>
              <option value="EL">Greek</option>
              <option value="GU">Gujarati</option>
              <option value="HE">Hebrew</option>
              <option value="HI">Hindi</option>
              <option value="HU">Hungarian</option>
              <option value="IS">Icelandic</option>
              <option value="ID">Indonesian</option>
              <option value="GA">Irish</option>
              <option value="IT">Italian</option>
              <option value="JA">Japanese</option>
              <option value="JW">Javanese</option>
              <option value="KO">Korean</option>
              <option value="LA">Latin</option>
              <option value="LV">Latvian</option>
              <option value="LT">Lithuanian</option>
              <option value="MK">Macedonian</option>
              <option value="MS">Malay</option>
              <option value="ML">Malayalam</option>
              <option value="MT">Maltese</option>
              <option value="MI">Maori</option>
              <option value="MR">Marathi</option>
              <option value="MN">Mongolian</option>
              <option value="NE">Nepali</option>
              <option value="NO">Norwegian</option>
              <option value="FA">Persian</option>
              <option value="PL">Polish</option>
              <option value="PT">Portuguese</option>
              <option value="PA">Punjabi</option>
              <option value="QU">Quechua</option>
              <option value="RO">Romanian</option>
              <option value="RU">Russian</option>
              <option value="SM">Samoan</option>
              <option value="SR">Serbian</option>
              <option value="SK">Slovak</option>
              <option value="SL">Slovenian</option>
              <option value="ES">Spanish</option>
              <option value="SW">Swahili</option>
              <option value="SV">Swedish </option>
              <option value="TA">Tamil</option>
              <option value="TT">Tatar</option>
              <option value="TE">Telugu</option>
              <option value="TH">Thai</option>
              <option value="BO">Tibetan</option>
              <option value="TO">Tonga</option>
              <option value="TR">Turkish</option>
              <option value="UK">Ukrainian</option>
              <option value="UR">Urdu</option>
              <option value="UZ">Uzbek</option>
              <option value="VI">Vietnamese</option>
              <option value="CY">Welsh</option>
              <option value="XH">Xhosa</option>
            </select>
          </small>

          <small className="ml-6">
            © 2021 Instagram-Clone by Agatha Ambrose
          </small>
        </div>
      </footer>
    </div>
  );
};

export default Login;
