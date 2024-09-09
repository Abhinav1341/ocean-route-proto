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
      <div>
        {selectedPorts.origin && selectedPorts.destination && (
          <MapComponent
            markers={[selectedPorts.origin, selectedPorts.destination]}
          />
        )}
      </div>
    </div>
  );
}
