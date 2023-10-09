import { getPublicData } from "../service/api";
import { useState, useEffect } from 'react';
import KakaoMap from './KakaoMap';
import RechartBar from './RechartBar';


const FILTER_MAP = {
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

    const thisAccidents = accidents.filter(FILTER_MAP[filter]);

    console.log(thisAccidents);


    async function fetchData() {
        try {
            setIsLoaded(false);
            setError(null);

            const data = await getPublicData(year);

            setAccidents(data.data)

        } catch (error) {
            setError(error)
        } finally {
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        fetchData();
    }, [year])

    if (error) {
        return <p className="text-white">{error.message}</p>
    }

    if (!isLoaded) {
        return (
            <div className="p-8 flex justify-center">
              <div className="w-12 h-12 border-8 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )
    }


    return thisAccidents.length > 0 ? (
        <>
        <div className="p-[1rem]">

            <div className="w-1/2">
                <KakaoMap filter={filter} thisAccidents={thisAccidents} />
            </div>

            <div className="absoulte">
            <h1 className="text-white mt-[1rem]">{thisAccidents.length}건의 화재사건이 있습니다.</h1>

                <RechartBar thisAccidents={thisAccidents} fill="#0088fe" />
            </div>

            </div>
        </>
    ) : (
        <p className="text-white">0건의 화재사건이 있습니다.</p>
    )

};
