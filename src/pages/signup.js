import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { AiFillFacebook } from "react-icons/ai";
import { userDoesExist } from "../services/firebase";
import * as ROUTES from "../constants/routes";

const Signup = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  //Start State Settings
  const [username, setUserName] = useState("");
  const [fullName, setFullName] = useState("");

  const [emailAddress, setEmailAddress] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";
  //End State Settings

  const handleSignup = async (e) => {
    e.preventDefault();

    const userexists = await userDoesExist(username);
    if (userexists.length === 0) {
      try {
        const createdUserRes = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        //authenticate and save details(emailAdress, password and username(displayName))
        await createdUserRes.user.updateProfile({
          displayName: username,
        });

        //firebase to create a new user in firestore user collection for new user
        await firebase.firestore().collection("users").add({
          userId: createdUserRes.user.uid,
          username: username.toLowerCase(), fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });

        history.push(ROUTES.FEED);
      } catch (error) {
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUserName("")
      setError("The username is already in use by another account, please try another.")
    }
  };

  useEffect(() => {
    document.title = "Signup - Instagram";
  });

  return (
    <div className="container flex flex-col font-roboto md:mt-8">
      <div className="container flex m-auto md:mx-auto max-w-screen-md items-center h-full font-roboto">
        <div
          className="flex flex-col w-10/12 md:w-3/5 mx-auto 
      justify-center items-center "
        >
          <div
            className={`flex flex-col w-4/5 bg-white-pure shadow-sm border border-gray-primary p-5 mt-5 ${
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

            <div className="text-center font-semibold text-gray-base text-lg px-4 mb-4 leading-5">
              <h3>Sign up to see photos and videos from your friends.</h3>
            </div>

            <button
              className="flex justify-center items-center bg-blue-medium text-white-pure w-full 
                py-2 mt-3 mb-6 rounded font-medium focus:outline-none"
            >
              <AiFillFacebook className="text-2xl" />
              Log in with Facebook
            </button>

            <form onSubmit={handleSignup} method="POST">
              <div className="flex justify-center items-center relative text-gray-primary my-4 text-medium">
                <p>
                  <span className="absolute bottom-2 -left-0">
                    ___________________
                  </span>
                  OR
                  <span className="absolute bottom-2 -right-0">
                    ___________________
                  </span>
                </p>
              </div>

              <input
                aria-label="Enter your email address"
                placeholder="Email Address"
                value={emailAddress}
                type="email"
                className="text-sm placeholder-gray-primary w-full py-3 
                px-4 shadow-sm rounded border border-gray-primary mb-2
                outline-none"
                onChange={({ target }) => setEmailAddress(target.value)}
              />

              <input
                aria-label="Enter your full name"
                placeholder="Full Name"
                value={fullName}
                type="text"
                className="text-sm placeholder-gray-primary w-full py-3 
                px-4 shadow-sm rounded border border-gray-primary mb-2
                outline-none"
                onChange={({ target }) => setFullName(target.value)}
              />

              <input
                aria-label="Enter your username"
                placeholder="Username"
                value={username}
                type="text"
                className="text-sm placeholder-gray-primary w-full py-3 
                px-4 shadow-sm rounded border border-gray-primary mb-2
                outline-none"
                onChange={({ target }) => setUserName(target.value)}
              />

              <div className="relative">
                <input
                  aria-label="Enter your password"
                  id="password"
                  value={password}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="text-sm placeholder-gray-primary w-full py-3 
                  px-4 shadow-sm rounded border border-gray-primary mb-2
                  outline-none"
                  onChange={({ target }) => setPassword(target.value)}
                />
                <input
                  type="button"
                  value={showPassword ? "Hide" : "Show"}
                  className={`absolute top-0 right-0 py-3 text-sm px-2 
                  shadow-sm rounded border border-gray-primary
                  outline-none cursor-pointer ${password.trim().length === 0 ? "hidden" : "block"}`}
                  onClick={() => setShowPassword(showPassword ? false : true)}
                />
              </div>

              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium text-white-pure w-full py-2 mt-3 rounded font-medium focus:outline-none 
                      ${isInvalid && "opacity-50"}`}
              >
                Sign up
              </button>

              <div className="text-center text-sm p-4 text-gray-base">
                <p>
                  By signing up, you agree to our{" "}
                  <span className="font-semibold">
                    Terms, Data Policy <span className="font-normal">and</span>{" "}
                    Cookies Policy
                  </span>
                  .
                </p>
              </div>

              <div className="flex justify-center items-center text-center">
                {error && (
                  <p className="text-sm text-red-primary mb-4">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </div>
          <div
            className="flex justify-center w-4/5 bg-white-pure shadow-sm 
         border border-gray-primary p-5 mt-5 mb-3"
          >
            <p>
              Have an account?{" "}
              <span className="text-blue-medium font-medium">
                <Link to="/">Login</Link>
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
              className="w-1/4 mr-2"
            />
            <img
              src="/images/googleplaylogo.png"
              alt="logo"
              className="w-1/4"
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

export default Signup;
