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

  const [referenceLines, setReferenceLines] = useState(refSpectrumData["fraunhofer"]);

  const minWavelength = 3500;
  const maxWavelength = 6000;
  const defaultMinWavelength = 3700;
  const defaultMaxWavelength = 4700;


  const [currentMinWavelength, setCurrentMinWavelength] = useState(defaultMinWavelength);
  const [currentMaxWavelength, setCurrentMaxWavelength] = useState(defaultMaxWavelength);

  const hasReferenceLines = referenceLines.length > 0;

  const leftMostRef = hasReferenceLines ? Math.min(...referenceLines.map(l => l.wavelength)) : null;
  const rightMostRef = hasReferenceLines ? Math.max(...referenceLines.map(l => l.wavelength)) : null;


  const minShift = 0; // Z >= 0
  const maxShift = 1000; //currentMaxWavelength - rightMostRef;


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

  const dataToPlot =
    galaxySpectrumData && galaxySpectrumData.length > 0 ? galaxySpectrumData : defaultGalaxySpectrumData;

  return (
    <div className="w-full max-w-3xl bg-white rounded p-4">
      <ResponsiveContainer width="100%" height={320}>

        <LineChart
          data={dataToPlot}
          margin={{ top: 25, right: 20, bottom: 20, left: 0 }}
        >
          <text
            x="50%"
            y={10}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: 17 }}

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
      <div className="mt-3 text-sm text-black bg-white p-2 rounded w-full max-w-3xl">
        <div className="flex items-center gap-4 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showStaticLines}
              onChange={() => setShowStaticLines(!showStaticLines)}
            />
            Toggle Reference Lines
          </label>
        </div>
        {/* Offset Controls */}
        <div className="flex items-center gap-4 mb-2">
          <label>
            Shift (Å):
            <input
              type="number"
              step="0.1"
              value={dragOffset.toFixed(1)}
              onChange={(e) => updateDragOffset(parseFloat(e.target.value))}
              className="ml-2 border border-gray-400 rounded px-1 w-24"
              disabled={!hasReferenceLines}
            />
          </label>
          <button
            onClick={() => updateDragOffset(0)}
            className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
            disabled={!hasReferenceLines}
          >
            Reset
          </button>

        </div>
        <input
          type="range"
          min={minShift}
          max={maxShift}
          step={0.1}
          value={dragOffset}
          onChange={(e) => updateDragOffset(parseFloat(e.target.value))}
          className="w-full mt-2"
          disabled={!hasReferenceLines}
        />
      </div>

      {!hasReferenceLines && (
        <div className="mt-2 text-sm text-gray-600">
          Select a reference line set to enable wavelength shifting.
        </div>
      )}

    </div>
  );
}
