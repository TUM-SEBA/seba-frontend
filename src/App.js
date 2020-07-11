import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ThemeProvider} from "@material-ui/styles";
import theme from "./themes/index";
import ErrorPage from "./pages/ErrorPage";
import {createBrowserHistory} from "history";
import LoginPage from "./pages/LoginPage";
import CaretakerPage from "./pages/CaretakerPage";
import OwnerPage from "./pages/OwnerPage";
import WelcomePage from "./pages/WelcomePage";
import {isAuthenticated} from "../src/services/loginService";
import SockJS from "sockjs-client";

function App() {
  const history = createBrowserHistory();
  const sock = new SockJS("http://localhost:5000/echo");
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              !isAuthenticated() ? (
                <LoginPage history={history} />
              ) : (
                <WelcomePage history={history} />
              )
            }
          />
          <Route exact path="/error" render={() => <ErrorPage history={history} />} />
          <Route
            path="/caretaker"
            render={() =>
              !isAuthenticated() ? (
                <LoginPage history={history} />
              ) : (
                <CaretakerPage history={history} sock={sock} />
              )
            }
          />
          <Route
            path="/owner"
            render={() =>
              !isAuthenticated() ? (
                <LoginPage history={history} />
              ) : (
                <OwnerPage history={history} sock={sock} />
              )
            }
          />
          <Route path="*" render={() => <ErrorPage history={history} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
