import './App.css';
import { Router, Route, Switch, useHistory } from "react-router-dom";
import Request from "./request/request"
import Report from './reports/report';

function App() {

  const history = useHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route exact key="request" path="/" component={Request}></Route>
        <Route exact key="report" path="/report" component={Report}></Route>
      </Switch>
    </Router>
  );
}

export default App;
