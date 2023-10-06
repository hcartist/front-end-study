import { getPublicData } from "../service/api";
import { getPublicData2017 } from "../service/api";
import { getPublicData2018 } from "../service/api";
import { getPublicData2019 } from "../service/api";
import { getPublicData2020 } from "../service/api";
import { getPublicData2021 } from "../service/api";
import { useState, useEffect } from 'react';
import KakaoMap from './KakaoMap';
import RechartBar from './RechartBar';
import RechartPie from './RechartPie';


const FILTER_MAP2 = {
    서울특별시: (item) => item.시도 === "서울특별시",
    경기도: (item) => item.시도 === "경기도",
    경상북도: (item) => item.시도 === "경상북도",
    경상남도: (item) => item.시도 === "경상남도",
    전라북도: (item) => item.시도 === "전라북도",
    전라남도: (item) => item.시도 === "전라남도",
    제주도: (item) => item.시도 === "제주특별자치도",
    인천: (item) => item.시도 === "인천광역시"
}


export default function Dashboard({ year, filter }) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [accidents, setAccidents] = useState([])
    const [accidentCount, setAccidentCount] = useState(0);


    const thisAccidents2 = accidents.filter(FILTER_MAP2[filter]);

    console.log(thisAccidents2);
    console.log(accidentCount);
    // console.log(count);

    async function fetchData() {
        try {
            setIsLoaded(false);
            setError(null);

            const data = await getPublicData(year);

            setAccidents(data.data)

            // const count = accidents.totalCount

            // setAccidentCount(count)
            setAccidentCount(data.totalCount)


        } catch (error) {
            setError(error)
        } finally {
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        fetchData();
    }, [year])


    return (
        <>
        <div>
        <KakaoMap accidents={accidents} />
        </div>
        <div>
        {/* <RechartBar accidents={accidents} fill="#0088fe" /> */}
        </div>
        <div>
        <RechartPie accidents={accidents} fill="#0088fe" />
        </div>
        </>
    )

};
