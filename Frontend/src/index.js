import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import Fail from "./components/Fail";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/fail" component={Fail}/>
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <Routes/>,
  document.getElementById("root")
);

