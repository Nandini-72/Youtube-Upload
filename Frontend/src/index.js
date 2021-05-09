import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import Success from "./components/Success";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/success" component={Success}/>
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(
  <Routes/>,
  document.getElementById("root")
);

