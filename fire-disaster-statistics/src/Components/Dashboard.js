import { getPublicData2017 } from "../service/api";
import { getPublicData2018 } from "../service/api";
import { getPublicData2019 } from "../service/api";
import { getPublicData2020 } from "../service/api";
import { getPublicData2021 } from "../service/api";
import { useState, useEffect } from 'react';
// import KakaoMap from './KakaoMap';
// import RechartBar from './RechartBar';
// import RechartPie from './RechartPie';

const FILTER_MAP1 = {
    // 2017: () => console.log(getPublicData2021),
    2017: () => data2017,
    2018: () => data2018,
    2019: () => data2019,
    2020: () => data2020,
    2021: () => data2021
}

const FILTER_MAP2 = {
    서울특별시: (item) => item.시도 === "서울특별시",
    경기도: (item) => item.시도 === "경기도",
    경상도: (item) => item.시도 === "경상북도" || "경상남도",
    전라도: (item) => item.시도 === "전라북도" || "전라남도",
    제주도: (item) => item.시도 === "제주특별자치도"
}


// function saveDoc(thisAccidents) {
//     localStorage.setItem("thisAccidents", JSON.stringify(thisAccidents));
// }

// const initialr = JSON.parse(localStorage.getItem("thisAccidents") || "[]");



export default function Dashboard({ year, filter }) {

    console.log(year)
    console.log(filter)

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [accidents, setAccidents] = useState(initialr);
    const [nowAccidents, setNowaccidents] = useState("");
    // const [accidentCount, setAccidentCount] = useState(0)

    const thisAccidents1 = accidents.filter(FILTER_MAP1[year]);

    // const thisAccidents2 = nowAccidents.filter(FILTER_MAP2[accidents]);

    console.log(thisAccidents1)

    // thisAccidents1(thisAccidents2)

    // console.log(thisAccidents)

    // saveDoc(thisAccidents)



    async function fetchData2017() {
        try {
            setIsLoaded(false);
            setError(null);

            const data2017 = await getPublicData2017();
            setAccidents(data2017.data2017)


        } catch (error) {
            setError(error)
        } finally {
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        fetchData2017();
    }, [])


    async function fetchData2018() {
        try {
            setIsLoaded(false);
            setError(null);

            const data2018 = await getPublicData2018();

        } catch (error) {
            setError(error)
        } finally {
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        fetchData2018();
    }, [])

    async function fetchData2019() {
        try {
            setIsLoaded(false);
            setError(null);

            const data2019 = await getPublicData2019();

        } catch (error) {
            setError(error)
        } finally {
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        fetchData2019();
    }, [])

    async function fetchData2020() {
        try {
            setIsLoaded(false);
            setError(null);

            const data2020 = await getPublicData2020();

        } catch (error) {
            setError(error)
        } finally {
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        fetchData2020();
    }, [])

    async function fetchData2021() {
        try {
            setIsLoaded(false);
            setError(null);

            const data2021 = await getPublicData2021();

        } catch (error) {
            setError(error)
        } finally {
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        fetchData2021();
    }, [])

    return (
        <>
            {/* <div>
        <KakaoMap accidents={accidents} />
        </div>
        <div>
        <RechartBar accidents={accidents} fill="#0088fe" />
        </div>
        <div>
        <RechartPie accidents={accidents} fill="#0088fe" />
        </div> */}
        </>
    )

};
