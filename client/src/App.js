import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthContext from "./store/auth-context";

import Layout from "./components/Layout/Layout";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ImageSearch from "./pages/ImageSearch";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>

        <Route path="/home" exact>
          <HomePage />
        </Route>

        {!isLoggedIn && (
          <Route path="/auth" exact>
            <AuthPage />
          </Route>
        )}

        <Route path="/images" exact>
          {isLoggedIn ? <ImageSearch /> : <Redirect to="/auth" />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
