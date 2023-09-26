import { getPublicData } from "./service/api";
import { useState } from "react";
import Dashboard from "./Components/Dashboard";
import FilterButton from "./Components/FilterButton";

const initialData = JSON.parse(localStorage.getItem("data") || "[]");

function saveDoc(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

export default function App() {

  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState("서울특별시")

  console.log(data);



  const FILTER_MAP = {
    seoul_Btn: () => (filterButton.name)
  }

  
  
  
  const filterButtons = FILTER_MAP.map(filterButton => (
    <filterButton
      key={filterButton.id}
      id={filterButton.id}
      name={filterButton.name}
    />
  ))

  return (
    <div>
      <FilterButton/>
    </div>
  )


};
