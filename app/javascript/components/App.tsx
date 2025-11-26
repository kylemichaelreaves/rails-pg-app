import * as React from "react";
import {Outlet} from "react-router";
import "mapbox-gl/dist/mapbox-gl.css";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import NavBar from "~//components/NavBar";

export default function App() {
    return (
        <>
            <NavBar/>
            <Outlet/>
            <ReactQueryDevtools initialIsOpen/>
        </>
    );
}