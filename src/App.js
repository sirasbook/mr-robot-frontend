import './App.css';
import { Router, Route, Switch, useHistory } from "react-router-dom";
import Request from "./request/request"

function App() {

  const history = useHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route exact key="request" path="/" component={Request}></Route>
      </Switch>
    </Router>
  );
}

export default App;
