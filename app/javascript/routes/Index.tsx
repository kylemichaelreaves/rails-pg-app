import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Properties from './Properties';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


export default function () {
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="properties" element={<Properties />}/>
    </Routes>
}

