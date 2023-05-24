"use client";
import { useEffect, useState } from "react";
import { getLineAndCharacterOfPosition } from "typescript";
import cafeData from "/public/total_final_data.json";
import dynamic from "next/dynamic";
// import location from "./location";

function Map() {
  /*global kakao*/
  // const [Lng, setLng] = useState();
  // const [Lat, setLat] = useState();
  const [data, setData] = useState();
  const [Lng, setLng] = useState();
  const [Lat, setLat] = useState();
  console.log(cafeData[2]);
  console.log(cafeData.length);
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
        setLat(37.557461);
        setLng(126.924772);
        // setLat(33.451393); //! 임시 위치 ->제주도 카카오
        // setLng(126.570738);
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

        //! 내위치 마커 표시
        var imageSrc = "https://cdn.pixabay.com/photo/2014/04/02/10/45/location-304467_640.png", // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(25, 35), // 마커이미지의 크기입니다
          imageOption = { offset: new kakao.maps.Point(25, 35) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
          markerPosition = new kakao.maps.LatLng(Lat, Lng); // 마커가 표시될 위치입니다

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
        });
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // var positions = [
        //   //? 데이터 예시 -> 이 형태 맞춰서 넣어주기만 하면 됨
        //   {
        //     content: "<div>카카오</div><div>카카오 정보</div><a href='naver.com'>네이버로<a/>",
        //     latlng: new kakao.maps.LatLng(33.450705, 126.570677),
        //   },
        // ];
        //! 다중 마커 표시 -> cafeData만큼 마커정보 만들기
        var positions = [];
        for (let i = 0; i < cafeData.length; i++) {
          positions.push({
            content: `<div style=width:220px;><a href='${cafeData[i].place_url}'><div style=font-weight:650>${cafeData[i].place_name}</div><a/><div style=font-size:smaller>${cafeData[i].road_address_name}</div><div>${cafeData[i].phone}</div></div>`,
            latlng: new kakao.maps.LatLng(cafeData[i].y, cafeData[i].x),
          });
        }

        for (var i = 0; i < positions.length; i++) {
          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커의 위치
          });

          // 마커에 표시할 인포윈도우를 생성합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: positions[i].content, // 인포윈도우에 표시할 내용
          });

          // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
          // 이벤트 리스너로는 클로저를 만들어 등록합니다
          // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
          kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, marker, infowindow));
          kakao.maps.event.addListener(marker, "click", makeOverListener(map, marker, infowindow)); //? 좌클릭시 정보표시, 우클릭시 정보창 제거
          kakao.maps.event.addListener(marker, "rightclick", makeOutListener(infowindow));
        }

        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
        function makeOverListener(map, marker, infowindow) {
          return function () {
            infowindow.open(map, marker);
          };
        }

        // 인포윈도우를 닫는 클로저를 만드는 함수입니다
        function makeOutListener(infowindow) {
          return function () {
            infowindow.close();
          };
        }
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
      <div id="map" style={{ width: "100vw", height: "65vh" }}></div>
    </div>
  );
}

export default Map;
