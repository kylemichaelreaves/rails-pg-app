import React from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import Home from "../components/Home";

export default (
  <Router>
    <Routes>
      <Route path="/" exact component={Home} />
    </Routes>
  </Router>
);
