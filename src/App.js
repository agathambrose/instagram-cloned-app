import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import * as Routes from "./constants/routes"
import { LinearProgress } from "@material-ui/core";

const Login = lazy(() => import("./pages/login"));
const Newsfeed = lazy(() => import("./pages/profile"));
const Signup = lazy(() => import("./pages/signup"))
const Profile = lazy(() => import("./pages/profile"))
const Notfound = lazy(() => import("./pages/notfound"))

function App() {
  return (
    <Router>
      <Suspense
        fallback={<LinearProgress variant="determinate" color="primary" value="Please wait..." />}
      >
        <Switch>
          <Route path={Routes.LOGIN}>
            <Login />
          </Route>

          <Route path={Routes.FEED}>
            <Newsfeed />
          </Route>

          <Route path={Routes.SIGNUP}>
            <Signup />
          </Route>

          <Route path={Routes.PROFILE}>
            <Profile />
          </Route>

          <Route path={Routes.NOTFOUND}>
            <Notfound />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
