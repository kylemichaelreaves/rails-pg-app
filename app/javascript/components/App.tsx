import * as React from "react";
import {Outlet} from "react-router";
import "mapbox-gl/dist/mapbox-gl.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import NavBar from "~//components/NavBar";

export default function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <NavBar/>
            {/*The following line is necessary to render routes !!*/}
            <Outlet/>
            <ReactQueryDevtools initialIsOpen/>
        </QueryClientProvider>
    );
}
