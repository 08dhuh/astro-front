"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend
} from "recharts";
import defaultGalaxySpectrumData from "@/data/spectra/NGC1357.json";

import refSpectrumData from "@/data/reference_line_sets.json"



const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { intensity } = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-400 rounded shadow text-sm text-black">
        <p><strong>Wavelength:</strong> {label.toFixed(0)} Å</p>
        <p><strong>Intensity:</strong> {intensity.toFixed(4)}</p>
      </div>
    );
  }
  return null;
};

export default function Spectrometer({ selectedGalaxy, spectrumData: galaxySpectrumData }) {
  const referenceSetOptions = [
    { key: "absorption", label: "Absorption Ca II H & K, G band" },
    { key: "balmer", label: "Hydrogen Balmer series" },
    { key: "agn", label: "Quasar/AGN emission lines" },
  ];
  //const [referenceLines, setReferenceLines] = useState(refSpectrumData["absorption"]);
  const [selectedReferenceSets, setSelectedReferenceSets] = useState(["absorption"]);
  const referenceLines = (() => {
    const uniqueIds = new Set();
    const collected = [];

    for (const setKey of selectedReferenceSets) {
      const lines = refSpectrumData[setKey] ?? [];
      for (const line of lines) {
        if (uniqueIds.has(line.id)) continue;
        uniqueIds.add(line.id);
        collected.push(line);
      }
    }

    return collected;
  })();
  const minWavelength = 3600;
  const maxWavelength = 6000;
  const defaultMinWavelength = 3700;
  const defaultMaxWavelength = 4700;

  const [currentMinWavelength, setCurrentMinWavelength] = useState(defaultMinWavelength);
  const [currentMaxWavelength, setCurrentMaxWavelength] = useState(defaultMaxWavelength);
  const [minInput, setMinInput] = useState(defaultMinWavelength);
  const [maxInput, setMaxInput] = useState(defaultMaxWavelength);
  const [isMinTyping, setIsMinTyping] = useState(false);
  const [isMaxTyping, setIsMaxTyping] = useState(false);

  const MIN_INCREMENT_GAP = 100;
  const WAVELENGTH_INCREMENT = 50; //always positive


  const hasReferenceLines = referenceLines.length > 0;

  const leftMostRef = hasReferenceLines ? Math.min(...referenceLines.map(l => l.wavelength)) : null;
  //const rightMostRef = hasReferenceLines ? Math.max(...referenceLines.map(l => l.wavelength)) : null;


  const minOffset = 0; // Z >= 0
  const maxOffset = 1000;


  //const [dragOffset, setDragOffset] = useState(0);
  const [showStaticLines, setShowStaticLines] = useState(true);

  const [z, setZ] = useState(0); //internal use only
  const dragOffset = hasReferenceLines && leftMostRef ? z * leftMostRef : 0;

  //default set
  //Ca H&K and G-band absorption lines
  //
  const updateDragOffset = (newOffset) => {
    if (hasReferenceLines && leftMostRef) {
      setZ(newOffset / leftMostRef);
    }
  }
  const handleMinWavelengthChange = () => {
    const increment = Math.max(10, WAVELENGTH_INCREMENT);

    let newMin = Math.round(minInput / increment) * increment;

    const upperLimit = currentMaxWavelength - MIN_INCREMENT_GAP;
    newMin = Math.min(newMin, upperLimit);
    newMin = Math.max(newMin, minWavelength);

    setCurrentMinWavelength(newMin);
    setMinInput(newMin);
    setIsMinTyping(false);
  };

  const handleMaxWavelengthChange = () => {
    const increment = Math.max(10, WAVELENGTH_INCREMENT);

    let newMax = Math.round(maxInput / increment) * increment;

    const lowerLimit = currentMinWavelength + MIN_INCREMENT_GAP;
    newMax = Math.max(newMax, lowerLimit);
    newMax = Math.min(maxWavelength, newMax);

    setCurrentMaxWavelength(newMax);
    setMaxInput(newMax);
    setIsMaxTyping(false);
  };


  const handleMinInputChange = (value) => {
    if (Number.isNaN(value)) return;
    setMinInput(value);

    if (!isMinTyping) {
      const upperLimit = currentMaxWavelength - MIN_INCREMENT_GAP;
      let newMin = value;
      newMin = Math.min(newMin, upperLimit);
      newMin = Math.max(newMin, minWavelength);
      setCurrentMinWavelength(newMin);
    }
  };

  const handleMaxInputChange = (value) => {
    if (Number.isNaN(value)) return;
    setMaxInput(value);

    if (!isMaxTyping) {
      const lowerLimit = currentMinWavelength + MIN_INCREMENT_GAP;
      let newMax = value;
      newMax = Math.max(newMax, lowerLimit);
      newMax = Math.min(newMax, maxWavelength);
      setCurrentMaxWavelength(newMax);
    }
  };



  const dataToPlot =
    galaxySpectrumData && galaxySpectrumData.length > 0 ? galaxySpectrumData : defaultGalaxySpectrumData;

  return (
    <div className="w-full max-w-3xl bg-white rounded p-4 space-y-4">

      <ResponsiveContainer width="100%" height={320}>

        <LineChart
          data={dataToPlot}
          margin={{ top: 25, right: 20, bottom: 20, left: 0 }}
          padding={{ bottom: 20 }}
        >
          <text
            x="50%"
            y={10}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: 17, fontWeight: "bold" }}

          >
            Spectrum of {selectedGalaxy?.id || "Unknown Galaxy"}
          </text>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="wavelength"
            domain={[currentMinWavelength, currentMaxWavelength]}
            tickCount={9}
            allowDataOverflow={true}
            label={{
              value: "Wavelength (Å)",
              position: "insideBottom",
              dy: 10,
            }}
            type="number"
          />
          <YAxis
            domain={[0, 1]}
            tickCount={6}
            allowDataOverflow={true}
            label={{ value: "Intensity", angle: -90, position: "insideLeft" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="intensity"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
          />
          <Line
            name="λ₀,K (3933.7 Å)"
            data={[]}
            stroke="blue"
            strokeWidth={2}
            legendType="line"
          />
          <Line
            name="λ₀,H (3968.5 Å)"
            data={[]}
            stroke="blue"
            strokeWidth={2}
            legendType="line"
          />

          <Legend verticalAlign="top" height={36} />


          {/* Static Lines */}
          {showStaticLines &&
            referenceLines.map((line) => (
              <ReferenceLine
                key={`static-${line.wavelength}`}
                x={line.wavelength}
                stroke="blue"
                strokeOpacity={0.4}
                strokeWidth={1.5}
                label={{
                  position: "top",
                  value: line.label,
                  fill: "red",
                  fontSize: 10,
                }}
              />
            ))}

          {/* Movable Lines */}
          {referenceLines.map((line) => (
            <ReferenceLine
              key={`movable-${line.wavelength}`}
              x={line.wavelength * (1 + z)}
              stroke="red"
              strokeDasharray="6 2"
              strokeWidth={1.5}
              isFront
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Controls */}
      {/* Plot Range Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-2 text-black bg-white text-sm">
        <label className="flex items-center gap-2">
          <span>Min range (Å):</span>
          <input
            type="number"
            step={WAVELENGTH_INCREMENT}
            min={minWavelength}
            max={currentMaxWavelength - MIN_INCREMENT_GAP}
            value={minInput}
            onChange={(e) => handleMinInputChange(parseFloat(e.target.value))}
            onKeyDown={() => setIsMinTyping(true)}
            onBlur={handleMinWavelengthChange}
            className="border border-gray-400 rounded px-1 w-20 text-sm"
          />
        </label>

        <label className="flex items-center gap-2">
          <span>Max range (Å):</span>
          <input
            type="number"
            step={WAVELENGTH_INCREMENT}
            min={currentMinWavelength + MIN_INCREMENT_GAP}
            max={maxWavelength}
            value={maxInput}
            onChange={(e) => handleMaxInputChange(parseFloat(e.target.value))}
            onKeyDown={() => setIsMaxTyping(true)}
            onBlur={handleMaxWavelengthChange}
            className="border border-gray-400 rounded px-1 w-20 text-sm"
          />
        </label>
      </div>

      <div className="mt-3 text-sm text-black bg-white p-2 rounded w-full max-w-3xl">
        <div className="flex items-center justify-between gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showStaticLines}
              onChange={() => setShowStaticLines(!showStaticLines)}
            />
            Toggle Static Reference Lines
          </label>
          <label className="flex items-center gap-2">
            <span>Reference sets:</span>
            <select
              className="border border-gray-400 rounded px-1 py-0.5 text-sm bg-white"
              value=""
              onChange={(e) => {
                const key = e.target.value;
                if (!key) return;

                setSelectedReferenceSets((prev) =>
                  prev.includes(key)
                    ? prev.filter((k) => k !== key)
                    : [...prev, key]
                );
              }}
            >

              <option value="" disabled>Toggle reference sets…</option>
              {referenceSetOptions.map((set) => {
                const isActive = selectedReferenceSets.includes(set.key);
                return (
                  <option key={set.key} value={set.key}>
                    {isActive ? "✅ " : ""}
                    {set.label}
                  </option>
                );
              })}
            </select>
          </label>

        </div>
        {/* Offset Controls */}
        <div className="flex items-center justify-between gap-4 mb-2">
          <label>
            Δλ Offset (Å):
            <input
              type="number"
              step="0.1"
              value={dragOffset.toFixed(1)}
              onChange={(e) => updateDragOffset(parseFloat(e.target.value))}
              className="ml-2 border border-gray-400 rounded px-1 w-24"
              disabled={!hasReferenceLines}
            />
          </label>
          <div className="flex items-center gap-2">

            <button
              onClick={() => updateDragOffset(0)}
              className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
              disabled={!hasReferenceLines}
            >
              Reset Offset
            </button>
            <button
              onClick={() => {
                setCurrentMaxWavelength(defaultMaxWavelength);
                setCurrentMinWavelength(defaultMinWavelength);
                setMaxInput(defaultMaxWavelength);
                setMinInput(defaultMinWavelength);
              }}
              className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
            >
              Reset Range
            </button>
          </div>

        </div>

        <input
          type="range"
          min={minOffset}
          max={maxOffset}
          step={0.1}
          value={dragOffset}
          onChange={(e) => updateDragOffset(parseFloat(e.target.value))}
          className="w-full mt-2"
          disabled={!hasReferenceLines}
        />
        <p className="text-xs text-gray-600 mt-1">
          Applied offset (Δλ) is measured from the leftmost reference line {leftMostRef ? `: ${leftMostRef.toFixed(1)} Å.` : ''}
        </p>
      </div>

      {!hasReferenceLines && (
        <div className="mt-2 text-sm text-gray-600 text-center">
          Select a reference line set to enable wavelength shifting.
        </div>
      )}

    </div>
  );
}
