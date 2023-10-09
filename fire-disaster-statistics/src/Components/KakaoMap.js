import { useState, useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';

const { kakao } = window;

export default function KakaoMap({ filter, thisAccidents }) {

    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState()
    
    useEffect(() => {
        if (!map) return
        const ps = new kakao.maps.services.Places()

        console.log(thisAccidents)
        

        ps.keywordSearch(filter , (data, status, _pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                const bounds = new kakao.maps.LatLngBounds()
                let markers = []

                for (var i = 0; i < data.length; i++) {
                    // @ts-ignore
                    markers.push({
                        position: {
                            lat: data[i].y,
                            lng: data[i].x,
                        },
                        content: data[i].place_name,
                    })
                    // @ts-ignore
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                }
                setMarkers(markers)

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds)
            }
        })
    }, [thisAccidents])

    return (
        <Map // 로드뷰를 표시할 Container
            center={{
                lat: 37.566826,
                lng: 126.9786567,
            }}
            style={{
                height: "750px",
            }}
            level={3}
            onCreate={setMap}
        >
        </Map>
    )
};
