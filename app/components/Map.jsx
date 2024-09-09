import { useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const MapComponent = () => {
  useEffect(() => {
    maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const map = new maptilersdk.Map({
      container: "map",
      style: maptilersdk.MapStyle.STREETS,
      center: [16.62662018, 49.2125578],
      zoom: 14,
    });
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default MapComponent;
