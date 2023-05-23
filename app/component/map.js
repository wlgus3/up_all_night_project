"use client";
import { useEffect, useState } from "react";
import { getLineAndCharacterOfPosition } from "typescript";
import cafeData from "/public/total_final_data.json";
// import location from "./location";

function Map() {
  /*global kakao*/
  // const [Lng, setLng] = useState();
  // const [Lat, setLat] = useState();
  const [data, setData] = useState();
  const [Lng, setLng] = useState();
  const [Lat, setLat] = useState();
  console.log(cafeData[2]);
  function location() {
    //!브라우저에서 위치 받아오는 함수
    const { geolocation } = navigator;

    geolocation.getCurrentPosition(
      (position) => {
        // success.
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        // setIsLoading(false);
      },
      (error) => {
        console.warn("Fail to fetch current location", error);
        setLat(37.570892);
        setLng(126.97725);
        // setIsLoading(false);
        console.log(Lat, Lng);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
    return { Lat, Lng };
  }

  const drawingMap = async () => {
    //!지도로딩 시작
    //! DOM을 여기서 직접 만져서 <head/>안에 <script/>넣어줌
    // DOM을 이용하여 script 태그를 만들어주자.
    const mapScript = document.createElement("script");
    // script.async = true 라면,
    // 해당 스크립트가 다른 페이지와는 비동기적으로 동작함을 의미한다.
    mapScript.async = true;
    // script.src에 map을 불러오는 api를 넣어주자.
    // 여기에서 우리가 기존에 발급 받았던 apiKey를 넣어주면 된다.
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`;

    //이제 우리가 만든 script를 document에 붙여주자.
    document.head.appendChild(mapScript);

    // script가 완전히 load 된 이후, 실행될 함수
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          // center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          center: new window.kakao.maps.LatLng(Number(Lat), Number(Lng)), // 지도의 중심좌표

          level: 5, // 지도의 확대 레벨
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        //!마커 테스트 성공 -> 광화문 찍어봄
        //?마커가 표시 될 위치
        let markerPosition = new kakao.maps.LatLng(37.570892, 126.97725);

        //? 마커를 생성
        let marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        //? 마커를 지도 위에 표시
        marker.setMap(map);

        //!다중 마커 테스트
      });
    };

    // sciprt가 완전히 load 된 이후, 지도를 띄우는 코드를 실행시킨다.
    mapScript.addEventListener("load", onLoadKakaoMap);

    //!지도로딩 끝
  };

  drawingMap();

  useEffect(() => {
    location();
  }, [Lat, Lng]);

  return (
    <div className="map_center">
      <div id="map" style={{ width: "90vw", height: "65vh" }}></div>
    </div>
  );
}

export default Map;
