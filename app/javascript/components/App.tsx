import * as React from "react";
import Home from "./Home";
import {Outlet} from "react-router";
import "mapbox-gl/dist/mapbox-gl.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export default function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Home/>
            {/*The following line is necessary to render routes !!*/}
            <Outlet/>
            <ReactQueryDevtools initialIsOpen/>
        </QueryClientProvider>
    );
}
