import { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard";
import { Areas } from "./Constants/Areas";
import { Years } from "./Constants/Years"


export default function App( thisAccidents ) {

  const [year, setYear] = useState(Years[0].value)
  const [filter, setFilter] = useState("서울특별시")
  
console.log(thisAccidents)

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
    <div>
      <header className="p-[1rem] border-b-[1px] border-gray-500">

        <nav className="flex">
          <img
            className="w-7 h-9 mt-[1px] mr-[1rem]"
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt=""
          />

          <p className="text-white text-4xl flex">화재사고 통계 조회</p>

        </nav>

        <div className="mt-[1rem] flex">
          <select 
          className="p-2 bg-gray-400 rounded-md mr-[5px]"
          onChange={({ target }) => setYear(target.value)}
          >{yearList}</select>
          <select 
          className="p-2 bg-gray-400 rounded-md"
          onChange={({ target }) => setFilter(target.value)}
          >{areaList}</select>
          </div>
      </header>

      <Dashboard year={year} filter={filter} />
    </div>
  )

};
