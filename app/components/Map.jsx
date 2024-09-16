"use client";
import { useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const MapComponent = ({ markers, path }) => {
  useEffect(() => {
    maptilersdk.config.apiKey = "f8z80lT5mrlIRgg0lcda";

    const map = new maptilersdk.Map({
      container: "map",
      style: maptilersdk.MapStyle.STREETS,
      center:
        markers.length > 0
          ? [markers[0].longitude, markers[0].latitude]
          : [16.62662018, 49.2125578],
      zoom: 5,
    });

    markers.forEach((marker) => {
      if (marker.latitude && marker.longitude) {
        new maptilersdk.Marker()
          .setLngLat([marker.longitude, marker.latitude])
          .addTo(map);
      } else {
        console.error("Invalid marker coordinates:", marker);
      }
    });

    if (path && path.length > 0) {
      map.on("load", () => {
        const polylineFeature = {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: path.map(([lat, lng]) => [lng, lat]),
          },
        };

        map.addLayer({
          id: "polyline",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [polylineFeature],
            },
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#ff0000",
            "line-width": 2,
          },
        });

        const bounds = new maptilersdk.LngLatBounds();
        path.forEach(([lat, lng]) => bounds.extend([lng, lat]));
        map.fitBounds(bounds, { padding: 50 });
      });
    }

    return () => map.remove();
  }, [markers, path]);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default MapComponent;
