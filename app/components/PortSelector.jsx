"use client";
import { useState, useEffect } from "react";

const PortSelector = () => {
  const [ports, setPorts] = useState({});
  const [selectedPort, setSelectedPort] = useState(null);

  useEffect(() => {
    fetch("/ports.json")
      .then((res) => res.json())
      .then((data) => setPorts(data))
      .catch((err) => console.error("Error Loading", err));
  }, []);

  const truncatePortName = (name, maxLength = 64) => {
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
  };

  const handleSelectChange = (e) => {
    const portName = e.target.value;
    setSelectedPort(
      ports[portName] ? { name: portName, ...ports[portName] } : null
    );
  };

  return (
    <div className="py-3">
      <select
        onChange={handleSelectChange}
        defaultValue=""
        className="p-2 text-xl text-slate-900 border w-1/2 border-cyan-900 rounded bg-slate-100"
      >
        <option value="" disabled>
          Select a Port
        </option>
        {Object.keys(ports).map((portName) => (
          <option key={portName} value={portName}>
            {truncatePortName(portName)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PortSelector;
