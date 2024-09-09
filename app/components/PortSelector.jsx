"use client";
import { useState } from "react";

const PortSelector = ({ ports, onSelectPort }) => {
  const [selectedPort, setSelectedPort] = useState(null);

  const truncatePortName = (name, maxLength = 64) => {
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
  };

  const handleSelectChange = (e) => {
    const portName = e.target.value;
    const selected = ports.find((port) => port.name === portName);
    setSelectedPort(selected);
    onSelectPort(selected);
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
        {ports.map((port) => (
          <option key={port.name} value={port.name}>
            {truncatePortName(port.name)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PortSelector;
