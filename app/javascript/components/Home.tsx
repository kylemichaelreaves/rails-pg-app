import * as React from "react";
import { Link, Routes, Route } from "react-router-dom";

export default function Home() {
  return (
    <Link to="/properties" className="btn btn-long custom-button" role="button">
      View Properties
    </Link>
  );
}
