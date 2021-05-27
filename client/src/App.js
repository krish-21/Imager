import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ImageSearch from "./pages/ImageSearch";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>

        <Route path="/home" exact>
          <HomePage />
        </Route>

        <Route path="/register" exact>
          <Register />
        </Route>

        <Route path="/login" exact>
          <Login />
        </Route>

        <Route path="/logout" exact>
          <Logout />
        </Route>

        <Route path="/images" exact>
          <ImageSearch />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
