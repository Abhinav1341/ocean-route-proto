"use client";

import { useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const MapComponent = ({ markers }) => {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_API_KEY) {
      console.error("API key is missing");
      return;
    }

    maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_API_KEY;
    
    const map = new maptilersdk.Map({
      container: "map",
      style: maptilersdk.MapStyle.STREETS,
      center: markers.length > 0 ? [markers[0].longitude, markers[0].latitude] : [16.62662018, 49.2125578],
      zoom: 14,
    });

    markers.forEach(marker => {
      if (marker.latitude && marker.longitude) {
        new maptilersdk.Marker()
          .setLngLat([marker.longitude, marker.latitude])
          .addTo(map);
      } else {
        console.error("Invalid marker coordinates:", marker);
      }
    });

    return () => map.remove();
  }, [markers]);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default MapComponent;


