import * as React from "react";
import NavBar from "./NavBar";
import Home from "./Home";
import { Outlet } from "react-router";

export default function App() {
  return (
    <>
      <Home />
      <NavBar />
      <Outlet />
    </>
  );
}
