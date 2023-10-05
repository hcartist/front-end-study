import { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard";
import { Areas } from "./Constants/Areas";
import { Years } from "./Constants/Years"


export default function App() {

  const [year, setYear] = useState("2021")
  const [filter, setFilter] = useState("서울특별시")


  const areaList = Areas.map(Area => (
    <option key={Area.name} value={Area.name}>
      {Area.name}
    </option>
  ))

  const yearList = Years.map(Year => (
    <option key={Year.name} value={Year.name}>
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
        </div>
      </div>
      <Dashboard
        year={year}
        filter={filter}
      />
    </>
  )

};
