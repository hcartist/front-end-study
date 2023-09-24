import { getPublicData } from "./service/api";
import { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard";


export default function App() {

  return (
    <>
      <button className="text-white">
        서울
      </button>
      <button className="text-white">
        인천
      </button>
      <button className="text-white">
        광주
      </button>
      <Dashboard />
    </>
  )
};
