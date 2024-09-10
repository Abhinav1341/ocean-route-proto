"use client";
import { useState, useEffect } from "react";
import PortSelector from "./components/PortSelector";
import MapComponent from "./components/Map";

export default function Home() {
  const [ports, setPorts] = useState([]);
  const [selectedPorts, setSelectedPorts] = useState({
    origin: null,
    destination: null,
  });
  const [showMap, setShowMap] = useState(false);
  const [path, setPath] = useState([]);

  useEffect(() => {
    fetch("/ports.json")
      .then((response) => response.json())
      .then((data) => {
        const transformedPorts = Object.keys(data).map((key) => ({
          name: key,
          ...data[key],
        }));
        setPorts(transformedPorts);
      });
  }, []);

  const handlePortSelection = (type, port) => {
    setSelectedPorts((prev) => ({
      ...prev,
      [type]: port,
    }));
  };

  const handleShowMap = () => {
    setShowMap(true);

    if (selectedPorts.origin && selectedPorts.destination) {
      const data = {
        start_lat: selectedPorts.origin.latitude,
        start_long: selectedPorts.origin.longitude,
        end_lat: selectedPorts.destination.latitude,
        end_long: selectedPorts.destination.longitude,
      };

      fetch("http://10.1.11.10:5000/getRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
          setPath(result.Path);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const markers = [selectedPorts.origin, selectedPorts.destination].filter(
    (port) => port && port.latitude && port.longitude
  );

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col">
      <div>
        <h2>Select Origin:</h2>
        <PortSelector
          ports={ports}
          onSelectPort={(port) => handlePortSelection("origin", port)}
        />
      </div>
      <div>
        <h2>Select Destination:</h2>
        <PortSelector
          ports={ports}
          onSelectPort={(port) => handlePortSelection("destination", port)}
        />
      </div>
      <button
        onClick={handleShowMap}
        disabled={!selectedPorts.origin || !selectedPorts.destination}
        className="mt-4 p-2 bg-blue-500 text-white w-1/2 mb-8"
      >
        Show on Map
      </button>
      <div>
        {showMap && markers.length > 0 && (
          <MapComponent markers={markers} path={path} />
        )}
      </div>
    </div>
  );
}
