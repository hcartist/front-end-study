import { getPublicData } from "../service/api";
import { useState, useEffect } from 'react';
// import KakaoMap from './KakaoMap';
// import RechartBar from './RechartBar';
// import RechartPie from './RechartPie';

const FILTER_MAP = {
    서울특별시: (item) => item.시도 === "서울특별시",
    경기도: (item) => item.시도 === "경기도",
    경상도: (item) => item.시도 === "경상북도" || "경상남도",
    전라도: (item) => item.시도 === "전라북도" || "전라남도",
    제주도: (item) => item.시도 === "제주특별자치도"
}

function saveDoc(r) {
    localStorage.setItem("r", JSON.stringify(r));
}

const initialr = JSON.parse(localStorage.getItem("r") || "[]");

export default function Dashboard({ filter }) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [accidents, setAccidents] = useState(initialr);
    const [accidentCount, setAccidentCount] = useState(0)

    const r = accidents.filter(FILTER_MAP[filter]);

    console.log(r)

    saveDoc(r)

    // console.log(filter)


    async function fetchData() {
        try {
            setIsLoaded(false);
            setError(null);

            const data = await getPublicData();
            console.log(data);

            console.log(data.totalCount)

            setAccidents(data.data);
            setAccidentCount(data.totalCount);


        } catch (error) {
            setError(error)
        } finally {
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    // return (
    //     <KakaoMap accidents={accidents} />
    // )

};
