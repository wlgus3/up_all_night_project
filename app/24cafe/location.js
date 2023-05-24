"use client";
import { useEffect, useState } from "react";

function location() {
  const [Lng, setLng] = useState();
  const [Lat, setLat] = useState();

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
      setLat(33.450701);
      setLng(126.570667);
      // setIsLoading(false);
      console.log(Lat, Lng);
    },
    {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: Infinity,
    }
  );
  return Lng, Lat;
}

export default location;
