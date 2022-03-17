import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Router, Route, Switch, useHistory } from "react-router-dom";
import Request from "./request/request";
import Report from "./reports/report";
import ForceGraph from "./components/amass/force-graph";

import data from "./data/data.json";

const queryClient = new QueryClient();

function App() {
  const history = useHistory();

  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <Switch>
          <Route exact key="request" path="/" component={Request}></Route>
          <Route exact key="report" path="/report" component={Report}></Route>
          <Route exact key="test" path="/test">
            <ForceGraph data={data} />
          </Route>
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
