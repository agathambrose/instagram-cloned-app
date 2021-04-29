import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import * as Routes from "./constants/routes"

const Login = lazy(() => import("./pages/login"));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={Routes.LOGIN}>
            <Login/>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
