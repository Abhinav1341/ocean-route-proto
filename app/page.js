"use client";
import { useState, useEffect } from "react";
import PortSelector from "./components/PortSelector";
import MapComponent from "./components/Map";

export default function Home() {
  const [ports, setPorts] = useState([]); // Ports data
  const [selectedPorts, setSelectedPorts] = useState({
    origin: null,
    destination: null,
  }); // Selected ports for form
  const [mappedPorts, setMappedPorts] = useState({
    origin: null,
    destination: null,
  }); // Ports to display on the map
  const [showMap, setShowMap] = useState(false); // Show/Hide map
  const [path, setPath] = useState([]); // Path data
  const [isLoading, setIsLoading] = useState(false); // Loading state

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
    setIsLoading(true); // Start loading
    setShowMap(false); // Hide map temporarily

    if (selectedPorts.origin && selectedPorts.destination) {
      const data = {
        start_lat: selectedPorts.origin.latitude,
        start_long: selectedPorts.origin.longitude,
        end_lat: selectedPorts.destination.latitude,
        end_long: selectedPorts.destination.longitude,
      };

      fetch("http://3.27.184.84:5000/getRoute", {
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
          setMappedPorts(selectedPorts);
          setShowMap(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const markers = [mappedPorts.origin, mappedPorts.destination].filter(
    (port) => port && port.latitude && port.longitude
  );

  const availableDestinationPorts = ports.filter(
    (port) => !selectedPorts.origin || port.name !== selectedPorts.origin.name
  );

  const availableOriginPorts = ports.filter(
    (port) =>
      !selectedPorts.destination || port.name !== selectedPorts.destination.name
  );

  return (
    <div className=" h-screen pt-8 pb-20 px-10 font-[family-name:var(--font-geist-sans)] flex flex-col">
      <div className="flex flex-row items-baseline gap-3 py-6 my-4 bg-gray-200 rounded-2xl px-8">
        <div className="flex flex-row items-center">
          <h2 className="px-6 font-semibold">Select Origin</h2>
          <PortSelector
            ports={availableOriginPorts}
            onSelectPort={(port) => handlePortSelection("origin", port)}
          />
        </div>
        <div className="flex flex-row items-center">
          <h2 className="px-6 font-semibold">Select Destination</h2>
          <PortSelector
            ports={availableDestinationPorts}
            onSelectPort={(port) => handlePortSelection("destination", port)}
          />
        </div>
        <button
          onClick={handleShowMap}
          disabled={!selectedPorts.origin || !selectedPorts.destination}
          className="p-2 text-xl my-auto rounded-md font-semibold bg-blue-500 text-white w-1/2"
        >
          Show on Map
        </button>
      </div>
      <div>
        {isLoading && (
          <p className="text-blue-700 text-4xl opacity-85 flex flex-row justify-center text-center items-center">
            Loading map...
          </p>
        )}
        {showMap && !isLoading && markers.length > 0 && (
          <MapComponent markers={markers} path={path} />
        )}
      </div>
    </div>
  );
}
