import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ThemeProvider} from "@material-ui/styles";
import theme from "./themes/index";
import ErrorPage from "./pages/ErrorPage";
import {createBrowserHistory} from "history";
import WelcomePage from "./pages/WelcomePage";

function App() {
  const history = createBrowserHistory();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <WelcomePage history={history} />} />
          <Route exact path="/error" render={() => <ErrorPage history={history} />} />
          <Route path="*" render={() => <ErrorPage history={history} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
