import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Error from "./Error";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
