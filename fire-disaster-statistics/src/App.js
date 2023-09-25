import { getPublicData } from "./service/api";
import { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard";

const initialData = JSON.parse(localStorage.getItem("data") || "[]"); // 초기 데이터 저장 형태

function saveDoc(data) {
  localStorage.setItem("data", JSON.stringify(data));
} // 로컬스토리지에 저장하는 방식

export default function App() {

  const [data, setData] = useState(initialData);

  console.log(data);

  // const FILTER_MAP = {
  //   seoul_Btn: () => true,

  // }

  

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
