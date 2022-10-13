import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage.jsx";
import Home from "./components/home/Home.jsx";
import Detail from "./components/detail/Detail.jsx";
import Form from "./components/form/Form.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/countries" component={Home} />
          <Route exact path="/countries/:id" component={Detail} />
          <Route exact path="/form" component={Form} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
