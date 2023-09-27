import { getPublicData } from "./service/api";
import { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard";
import { Areas } from "./Constants/Areas";


export default function App() {

  // const [accidents, setAccidents] = useState([]);
  // const [accidentCount, setAccidentCount] = useState(0);
  const [filter, setFilter] = useState("서울특별시")

  const areaList = Areas.map(Area => (
    <option key={Area.name} value={Area.name}>
      {Area.name}
    </option>
  ))

  return (
    <>
      <div>
        <div>
          <select onChange={({ target }) => setFilter(target.value)}
          >{areaList}</select>
        </div>
      </div>
      <Dashboard filter={filter}>
      </Dashboard>
    </>
  )

};
