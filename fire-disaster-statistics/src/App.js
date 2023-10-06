import { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard";
import { Areas } from "./Constants/Areas";
import { Years } from "./Constants/Years"


export default function App() {

  const [year, setYear] = useState(Years[0].value)
  const [filter, setFilter] = useState("서울특별시")


  const areaList = Areas.map(Area => (
    <option key={Area.name} value={Area.name}>
      {Area.name}
    </option>
  ))

  const yearList = Years.map(Year => (
    <option key={Year.name} value={Year.value}>
      {Year.name}
    </option>
  ))

  return (
    <>
      <div>
        <div>
          <select onChange={({ target }) => setYear(target.value)}
          >{yearList}</select>
          <select onChange={({ target }) => setFilter(target.value)}
          >{areaList}</select>
          <h1 className="text-white">개가 있습니다.</h1>
        </div>
      </div>
      <Dashboard
        year={year}
        filter={filter}
      />
    </>
  )

};
