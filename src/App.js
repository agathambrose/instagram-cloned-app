import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as Routes from "./constants/routes";
import { LinearProgress } from "@material-ui/core";

const Login = lazy(() => import("./pages/login"));
const Newsfeed = lazy(() => import("./pages/profile"));
const Signup = lazy(() => import("./pages/signup"));
const Profile = lazy(() => import("./pages/profile"));
const Notfound = lazy(() => import("./pages/notfound"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <LinearProgress
            variant="determinate"
            color="primary"
            value="Please wait..."
          />
        }
      >
        <Switch>
          <Route exact path={Routes.LOGIN} component={Login} />

          <Route exact path={Routes.FEED} component={Newsfeed} />

          <Route exact path={Routes.SIGNUP} component={Signup} />

          <Route exact path={Routes.PROFILE} component={Profile} />

          <Route component={Notfound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
